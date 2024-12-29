---
title: Integrate OrderCloud with Sitecore JSS Next.js
date: "2021-11-27"
spoiler: One way of doing this
---

In this blog post, I like to explain how easy it is to add some products from OrderCloud to a pre-rendered page in Sitecore JSS using Next.js

## First, make a storefront

To be able to do this you need to create an OrderCloud marketplace and have some products.
I created a free OrderCloud account and ran these commands to automatically create a marketplace filled with products and facets:

- `npm i @ordercloud/seeding -g`
- `seed https://raw.githubusercontent.com/ordercloud-api/ordercloud-seed/main/seeds/Simple-B2C.yml -u={username} -p={password`

Next, log in to your marketplace and make a note of the Storefront App ID:
![Storefront App ID](/blog/api-key.jpg)

Add this ID along with these OrderCloud variables to the .env file in the root of your JSS Next.js project:

```
NEXT_PUBLIC_OC_CLIENT_ID={AddYourStorefrontAppIdHere}
NEXT_PUBLIC_OC_SCOPE=Shopper,MeAddressAdmin
NEXT_PUBLIC_OC_BASE_API_URL=https://sandboxapi.ordercloud.io
NEXT_PUBLIC_OC_ALLOW_ANONYMOUS=false
```

## Initialise OrderCloud in your app

In the \_app.tsx add the following code to create a connection to Ordercloud using the Ordercloud Javascript SDK:

```javascript
import { Configuration, Tokens, Auth } from "ordercloud-javascript-sdk";

(async function(){
    const clientId = process.env.NEXT_PUBLIC_OC_CLIENT_ID || "";
    const baseApiUrl = process.env.NEXT_PUBLIC_OC_BASE_API_URL;
    const scope = process.env.NEXT_PUBLIC_OC_SCOPE?.split(",");

    Configuration.Set({
      clientID: clientId,
      baseApiUrl: baseApiUrl,
      cookieOptions: { prefix: "hds-nextjs", path: "/" },
    });

    const authResponse = await Auth.Anonymous(clientId, scope || ([""] as ApiRole[]));

    Tokens.SetAccessToken(authResponse.access_token);

})();
```

Now you have access to all the OrderCloud stuff throughout your application. If you only need OrderCloud on a specific set of routes, consider moving this logic somewhere else.

To display some products with an active facet pre-selected I have created a simple Sitecore component where the facet is set in the Sitecore admin. Component definition:

```javascript
export default function (manifest: Manifest): void {
  manifest.addComponent({
    name: "ProductList",
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: "colorfacet", type: CommonFieldTypes.SingleLineText }],
  });
}
```

## Get the products

In the actual component implementation, the products are fetched using the `Me.ListProducts` function. To inject the data into the component return the response in `getStaticProps`. Now the data is available within the component using `useComponentProps`.

See the code below for an example:

```javascript
import { ListPageWithFacets, Me, RequiredDeep, BuyerProduct } from "ordercloud-javascript-sdk";

const ProductList: React.FC<ProductListProps> = ({ rendering, fields }): JSX.Element => {
  const data = useComponentProps < RequiredDeep < ListPageWithFacets < BuyerProduct >>> rendering.uid;
};

export const getStaticProps: GetStaticComponentProps = async (rendering) => {
  try {
    const response = await Me.ListProducts({
      filters: {
        "xp.Facets.Color": rendering.fields.colorfacet.value,
      },
    });

    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default ProductList;
```

As a result, we now have products from our OrderCloud marketplace rendered on Next.js build-time. Fast and good for SEO!

![OrderCloud products](/blog/ordercloud-products.jpg)
