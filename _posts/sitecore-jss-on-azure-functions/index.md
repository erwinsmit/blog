---
title: Sitecore JSS on Azure Functions
date: "2021-10-27"
spoiler: Steps required
---

As described in a previous post, we managed to host Next.js using a custom server in [Azure Functions](/blog/nextjs-on-azure-functions/). Now let's see if this also works for Sitecore JSS.

## Frontend only

For just the public facing part it was no problem, the exact same code as used in the custom server [previously](/blog/nextjs-on-azure-functions/) worked fine.
However to get the experience editor working we faced some challenges.

## Experience editor

To get the Experience editor to work we have to do some more work. Mainly because the Next.js [API routes](https://github.com/Sitecore/jss/tree/dev/samples/nextjs/src/pages/api/editing) are not supported when using a [custom server](https://nextjs.org/docs/advanced-features/custom-server).

Luckily these routes are easy to replicate using Azure Functions. So we created two Azure Functions that serves the:

- Editing Render Middleware
- Editing Data Middleware

Why do you need two endpoints for the Experience editor? This is to enable the **[Preview mode](https://nextjs.org/docs/advanced-features/preview-mode)** in Next.js. The preview mode bypasses all the clever stuff like **ISG** (Incremental Static Generation).
How these endpoints work together is explained well in the [JSS Docs](https://jss.sitecore.com/docs/nextjs/experience-editor/architecture).

Implementing these endpoints was done with the following code, this example is for the [Editing Render Middleware](https://github.com/Sitecore/jss/blob/dev/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts):

```javascript
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { EditingRenderMiddleware } from "@sitecore-jss/sitecore-jss-nextjs/middleware";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const handler = new EditingRenderMiddleware().getHandler();

  try {
    await handler(context.req, context.res);
  } catch (e) {
    context.log(e);
    context.res = {
      status: 500,
    };
  }
};

export default httpTrigger;
```

### Response handler

The problem is that the response from Azure does not contain the same methods as Vercel. An [example](https://github.com/Sitecore/jss/blob/dev/packages/sitecore-jss-nextjs/src/middleware/editing-render-middleware.ts#L86) is seen here:

```javascript
return res.status(405).json({
  html: `<html><body>Invalid request method '${method}'</body></html>`,
});
```

Azure Functions will return errors that these methods don't exist. These methods are used throughout the Middlewares from Sitecore JSS. Do we need to replace all those middlewares? That would be a lot of work.

The easiest fix was to create a function that transforms all the Vercel specific functions to a format Azure understands. So we created a Responsehandler function that accepts the Azure Function context and attaches the Vercel specific functions:

```javascript
export const getNextResponseHandler = (context: Context) => {

    const nextContextRes = context.res;

    nextContextRes.status = (statusCode: number) => {
        nextContextRes.status = statusCode;

        return nextContextRes;
    }

    nextContextRes.setPreviewData = (previewData: string) => {
        const manifest = require('.next/prerender-manifest.json');

        const cookies = setPreviewData(previewData, manifest.preview);

        nextContextRes.headers = {
            'Set-Cookie': cookies.join(';'),
            'Content-Type': "application/json; charset=utf-8"
        };
    };

etc etc...
```

Now this method can be used within the Azure Function:

```javascript
const nextResponseHandler = getNextResponseHandler(context);

    try {
        await handler(customContextReq, nextResponseHandler);

```

Creating the `setPreview` method was a pain. Because the correct functions are not [exposed by Next.js](https://github.com/vercel/next.js/blob/5ddee4494bf1fbcfd91ce81bc59f8de66949c9fc/packages/next/server/api-utils.ts#L420). For this reason I ended up doing quite a bit of copy-pasting from the Next.js repository to get it to work.

### Editing data cache

Another issue we faced was the caching middleware throwing errors. After some digging the [following line](https://github.com/Sitecore/jss/blob/dev/packages/sitecore-jss-nextjs/src/middleware/editing-data-cache.ts#L24) caused an issue:

```javascript
  constructor() {
    // Use gzip compression and store using the OS temp directory (Vercel Serverless Functions have temp directory access)
    this.cache = new Cache('editing-data', { compression: 'gzip', location: os.tmpdir() });
  }
```

`os.tempdir()` was pointing to a directory where a Consumption Based Azure Function was not allowed to read/write to.

To resolve this, we created a custom EditingDataCache middleware function that sets a different directory. That middleware is added as a parameter to the EditingDataMiddleWare:

```javascript
const handler = new EditingDataMiddleware({
  editingDataCache: editingDataDiskCache,
}).getHandler();
```

It would be nice if this directory could be set as a parameter to the existing EditingDataDiskCache class. Hopefully, this [pull request](https://github.com/Sitecore/jss/pull/839) will sort that out.

## Tell Sitecore where to look for the Azure Function

Finally tell sitecore where to look for the Azure Function. This can be done in the config files of the Sitecore instance.

```xml
<app name="jss-nextjs-app"
    ...
    serverSideRenderingEngineEndpointUrl="https://${yourfunctionapp}.azurewebsites.net/api/editing/render"
    serverSideRenderingEngineApplicationUrl="https://${yourfunctionapp}.azurewebsites.net/"
/>
```

That's it, those were the problems we faced. Hopefully this could be helpful for anyone else facing similar issues.
