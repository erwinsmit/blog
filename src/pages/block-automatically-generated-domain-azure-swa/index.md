---
title: Block generated domains by Azure Static Web Apps
date: '2023-02-22'
spoiler: Azure Static Web Apps creates automatically a domain like "blue-river-096abc21e.2.azurestaticapps.net", how can you block this domain on a Hybrid Next.js implementation?
---

Please note: This post applies for [Hybrid Next.js Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid)

Azure Static Web Apps creates automatically a domain like `blue-river-096abc21e.2.azurestaticapps.net`. Even when you have created a custom domain for your Azure Static Web App it's not possible to [disable or block this domain](https://techcommunity.microsoft.com/t5/apps-on-azure/is-it-possible-to-disable-the-default-url-assigned-to-the-azure/m-p/2017272).

In a current **Sitecore JSS Next.js** project we are applying IP restrictions on our custom domains, but these automatically generated URLs can't be blocked using Web Application Firewall or Azure Frontdoor. So how do we make sure these URLs are not publicly accessible? 

Luckily with Next.js you can use [middleware](https://nextjs.org/docs/advanced-features/middleware) for a while now. So my idea was to apply a redirect to the custom domain when I detect a `.azurestaticapps` host header. But, when you inspect all the headers on a request, no host header was present when an [azurestaticapps.net domain is used](https://github.com/Azure/static-web-apps/issues/1012). 

Luckily, when you access the site using a custom domain, you DO get a header with the hostname in it. Using that you can create a redirect with a few lines of code in your _middleware.ts file:

```javascript
const host = req.headers.get('x-forwarded-host');

const blockedHostRedirect = process.env.BLOCKED_HOST_REDIRECT || 'https://www.erwinsmit.com';

// When x-forwarded-host header is not set, a default URL is used (e.g. blue-river-096abc21e.2.azurestaticapps.net)
// so redirect to blockedHostRedirect
if (!host && process.env.BLOCK_SWA_DEFAULT_HOST) {
    return NextResponse.redirect(blockedHostRedirect);
}
```

I like to switch features on or off using environment variables, `process.env.BLOCK_SWA_DEFAULT_HOST` is used to switch the redirect on or off. 
`process.env.BLOCKED_HOST_REDIRECT` is used for specifying a domain it should redirect to.

There you go, using Nextjs middelware it is possible to block access to the automatically generated URLs. 