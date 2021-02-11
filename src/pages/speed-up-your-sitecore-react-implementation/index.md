---
title: Speed up your Sitecore React implementation
date: '2021-02-11'
spoiler: Performance checklist
---

On a lot of Sitecore sites that jumped on the React bandwagon a while ago I notice some performance issues. In this post I will explain how to fix this and make your Sitecore/React implementation almost as fast as a site build with [Stencil components](https://www.erwinsmit.com/make-your-sxa-site-perform/)

The two main issues with these websites are ***Render blocking script tags*** and ***unused javascript***. Let's fix it!

## Render blocking script tags
I created a static [html page](https://www.erwinsmit.com/performancepoc) that reflects how many Sitecore sites work, it has inline script tags that refer to React components. Although these components are already rendered server side they still need to be "Hydrated". Hydration of a React component adds all the client side magic like event listeners, state changes, hooks etc. 

![](./hydration.jpg "Hydrate React component")

It's no exception to have about 20 of these inline script tags on the page to hydrate all the necessary React components. There are two issues with this approach. Every script tag that is not at the absolute bottom of the page blocks the rendering of the HTML that follows, so the footer will not be rendered until the script tags in the main section are executed. The same applies for the rendering of the main section, this will not happen until the hydration of the header navigation is completed. For performance reasons this is not ideal, the HTML of the components is already server side rendered meaning that the user can see and interact with most of the HTML. 

The second issue with this approach is the the dependency on global modules within the script tags, "ClientX.default.Navigation" needs to be registered on the Window object otherwise runtime exceptions will occur. Therefor the JavaScript bundle responsible for registering these components is at the top of the page. As a result the browser first needs to load and execute this script before it can render the HTML. You can imagine tools like Google Lighthouse are not happy with this!

![](./lighthouse-not-happy.jpg "Lighthouse isn't happy!") 

### How to fix this?
In the entrypoint for the client bundle the code usually looks like this:

```javascript
import "expose-loader?exposes=React!react";
import "expose-loader?exposes=ReactDOM!react-dom";
import "expose-loader?exposes=ClientX!../src/components";
```

React & ReactDOM are exposed to the window object and src/components refers to a entrypoint for all the components used within the sitecore rendering. That entrypoint is usually build up with a lot of imports and exports:
```javascript
import SearchResults from './30_Organisms/Blog/BlogPostsOverview';
import SearchBox from './30_Organisms/SearchBox/container';
import BlogPostDetails from './30_Organisms/Blog/BlogPostDetails';
import Contact from './20_Molecules/Contact';
import NavigationSearchBox from './30_Organisms/SearchBox/variants/SimpleSearchBox';
import BannerTeaser from './20_Molecules/Teasers/BannerTeaser';

export default {
    BlockTeaser, 
    Button, 
    FAQ,  
    FAQList,
    NavigationImageList, 
    FooterMainImage
}
```

This causes the components to be registered on the window object like "window.ClientX.default.FAQ"

To fix the render blocking we first put html comments <!-- --> around all the hydration script. I also added a react-data-hydrate attribute so they are easily distinguishable from other inline scripts (e.g. Google tag manager).
```html
<!--
    <script data-react-hydrate>
        ReactDOM.hydrate(React.createElement(ClientX.default.Navigation, 
        { "module": "ClientX.default.Navigation", "id": "a2feda75-fd69-4811-962a-dd5411e3e7dd", "name": "Main Navigation", "variant": "vertical", "editing": false, "datasource": { "id": "518f590a-a4cc-446a-be85-b44efc8e4f6c" } } ))
    </script>    
-->     
```

Now let's change the entrypoint to the following 

```javascript
const bodyHtml = document.body.innerHTML;
bodyHtml.replace(/(?=<!--<script data-react-hydrate)([\s\S]*?)-->/gm, (match) => {
    const scriptTag = match.replace(/^<!--|-->$|<script data-react-hydrate>|<\/script>/g, "")
    try {
        Function(scriptTag)();
    } catch(e) {
        console.error('hydrating error:', e);
    }
    return "";
});
```

So with a regex we collect all the hydration scripts, and execute them by creating a function from the string and execute it directly. Now we can also move the reference to the client bundle to the bottom of the page as done [here](https://www.erwinsmit.com/performancepoc/without-render-blockers.html). 

As a result, the Google Lighthouse warning is almost gone!

![](./lighthouse-no-render-blockers.jpg "Lighthouse almost happy")

It's still complaining about the css bundle blocking things, to fix that usually applying CSSPurge as discussed in a [previous blog post](https://www.erwinsmit.com/make-your-sxa-site-perform/) is enough.

## Unused JavaScript
As described above the entrypoint imports all the components to be exported and exposed to the Window object. Because not all pages use the same components, you will always have a lot of unused JavaScript sitting on the page. 
Google Lighthouse is not happy with this

![](./lighthouse-unused-javascript.jpg "Google Lighthouse unused JavaScript")

The suggestions from Google Lighthouse to look at "React.lazy()" or "loadable-components" are not useful for this type of React implementation. Because it's no React application, but a couple of React components loaded separately on the page. 
For fixing this we need to think outside of the React box. This problem can be tackled with the following steps:

1. Find out which components are used on a page
2. Dynamically load these components using [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 
3. Expose the components onto the window object

### Find out which components are used on a page
With more regex magic we can create a array with the component names used on the page.

```javascript
const namespace = 'ClientX'
const regex = new RegExp(String.raw`${namespace}.default.+?(?=\W)`, 'gm');

const bodyHtml = document.body.innerHTML;
const allComponents = [...new Set(bodyHtml.match(regex))];
```

With the code above we grab all the components referenced in the inline script tags. With the "new Set" hack we remove all the duplicate keys. 

```javascript
[
    "ClientX.default.Navigation",
    "ClientX.default.Section",
    "ClientX.default.HeroTeaser",
    "ClientX.default.USPHeader"
]
```

### Dynamically load the components
To allow the components to be dynamically loaded we need to change the way we currently create the index file for the components.

```javascript
import SearchResults from './30_Organisms/Blog/BlogPostsOverview';
import SearchBox from './30_Organisms/SearchBox/container';
import BlogPostDetails from './30_Organisms/Blog/BlogPostDetails';
import Contact from './20_Molecules/Contact';
import NavigationSearchBox from './30_Organisms/SearchBox/variants/SimpleSearchBox';
import BannerTeaser from './20_Molecules/Teasers/BannerTeaser';

export default {
    BlockTeaser, 
    Button, 
    FAQ,  
    FAQList,
    NavigationImageList, 
    FooterMainImage
}
```

Instead, create a component loader object that adds a async function to every componentKey

```javascript
const componentLoader = {
    Navigation: async () => import('../src/components/20_Molecules/NavigationMenu/container'),
    Section: async () => import('../src/components/02_Wrappers/structure/Section'),
    HeroTeaser: async () => import('../src/components/30_Organisms/HeroTeaser/container'),
    USPHeader: async () => import('../src/components/20_Molecules/Headers/USPHeader'),
    BannerTeaser: async () => import('../src/components/20_Molecules/Teasers/BannerTeaser')
}
```

Next, create an async function that loops over the "allComponents" array, load the imports and assigning them to the window object. 

```typescript
type ReactWindow = Window & {
    [namespace]: {
        default: { [key: string]: () => void; }
    }
}

const reactWindow = window as unknown as ReactWindow;

async function loadComponents() {
    reactWindow[namespace] = { default: {} }
    const regex = new RegExp(String.raw`${namespace}.default.+?(?=\W)`, 'gm');

    const allComponents = [...new Set(bodyHtml.match(regex))];

    for (const component of allComponents) {
        const componentsSplit = component.split('.');
        const componentName = componentsSplit[componentsSplit.length - 1];
       
        reactWindow[namespace].default[componentName] = (await componentLoader[componentName]()).default;
    }
}
```
Now, if all is well, you will see a whole bunch of JavaScript files loaded in your requests instead of the one big bundle

![](./codesplitting-requests.jpg "Code splitting requests")

This is all great, and the amount of JavaScript loaded in total is already lower. But when running the [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) I notice there is some duplicate code across the bundles

![](./duplicate-code.jpg "Duplicate code")

"Icons.tsx" and "SafeRenderDatasourceComponent.tsx" are included in multiple bundles. This is still better than having one big bundle as before, but this can be easily fixed! 
One way of achieving this is to dynamically load "Icons.tsx" in all the components, however this is error prone and it's a lot of manual work.

My preference is to figure out which components are the most likely re-used within a project and force these in a dedicated bundle. This can be done in the webpack configuration:

```javascript
optimization: {
    splitChunks: {
        cacheGroups: {
            // custom cache group to force all components files
            // in /components/common into their own chunk
            atoms: {
                name: "atoms",
                test: /[\\/]components[\\/]10_Atoms[\\/]/,
                enforce: true
            },
            hocs: {
                name: "hocs",
                test: /[\\/]components[\\/]01_HOCs[\\/]/,

            }
        }
    }
}
```

As a result the amount of JavaScript loaded has more than halved in size on most pages!

### Why is webpack not splitting the bundles?
While working on a project that hasn't updated for a while these things where stopping webpack from splitting the bundles:

- Old version of typescript
- Deprecated awesome-typescript-loader was used, replace with [https://github.com/TypeStrong/ts-loader](ts-loader)
- Module was not set to "esnext" in the tsconfig.json

Fixing the items above already decreased the bundle size by quite a bit without code splitting. Probably by better treeshaking algorithms.

## The final code
With the following code in your entrypoint you combine the best of both worlds. No more render blocking script tags and a lean and mean JavaScript bundle. Enjoy your fast new project!


```typescript
import "expose-loader?exposes=React!react";
import "expose-loader?exposes=ReactDOM!react-dom";

const namespace = 'ClientX'
type ReactWindow = Window & {
    [namespace]: {
        default: { [key: string]: () => void; }
    }
}

const reactWindow = window as unknown as ReactWindow;
const bodyHtml = document.body.innerHTML;

const componentLoader = {
    Navigation: async () => import('../src/components/20_Molecules/NavigationMenu/container'),
    Section: async () => import('../src/components/02_Wrappers/structure/Section'),
    HeroTeaser: async () => import('../src/components/30_Organisms/HeroTeaser/container'),
    USPHeader: async () => import('../src/components/20_Molecules/Headers/USPHeader'),
    VehicleGridContainer: async () => import('../src/components/30_Organisms/VehicleGrid/VehicleGrid')
}

// 1. Only load the components that are present on the page
async function loadComponents() {
    reactWindow[namespace] = { default: {} }
    const regex = new RegExp(String.raw`${namespace}.default.+?(?=\W)`, 'gm');

    const allComponents = [...new Set(bodyHtml.match(regex))];

    for (const component of allComponents) {
        const componentsSplit = component.split('.');
        const componentName = componentsSplit[componentsSplit.length - 1];
       
        reactWindow[namespace].default[componentName] = (await componentLoader[componentName]()).default;
    }
}

// 2. Execute the react hydrate after the page is loaded... 
loadComponents().then(() => {
    bodyHtml.replace(/(?=<!--<script data-react-hydrate)([\s\S]*?)-->/gm, (match) => {
        const scriptTag = match.replace(/^<!--|-->$|<script data-react-hydrate>|<\/script>/g, "")
        try {
            Function(scriptTag)();
        } catch(e) {
            console.error('hydrating error:', e, scriptTag);
        }
        return "";
    })
});
```