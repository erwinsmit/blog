---
title: Create a scalable head for Sitecore JSS
date: "2022-09-26"
spoiler: I recently worked on a headless project with Sitecore, the way of working I choose there worked really well in my opinion. In this post, I like to talk about the choices I made and how they helped the team create a good workflow.
---

I recently worked on a headless project with Sitecore, the way of working I choose there worked really well in my opinion. In this post, I like to talk about the choices I made and how they helped the team create a good workflow.

What do I mean by scalable in this context? By scalable I mean a few things:

- The head should be able to work with data model changes.
- The head should be able to perform well even if there are hundreds of different components in the application.
- The head should be able to look good in different color themes, different font sizes, different spacings, etc.
- The team that develops the head should be able to scale well, and new members should be able to easily integrate into the project without any domain or Sitecore knowledge.

## Monorepo

Within the Monorepo I created a clear separation between UI components and the Sitecore JSS Next.js application.
See the following drawing:

![Monorepo](/blog/monorepo.png)

This monorepo is using NPM workspaces in combination with Turborepo, this works well but there are a lot of similar tools that achieve the same thing.
With monorepo's it's common to have **packages** and **apps**. Packages refer to internal codebases and apps are meant for applications that will be seen by a non-technical end-user. See the example from Turborepo for an [excellent example](https://turborepo.org/docs/getting-started/create-new#2-exploring-your-new-repo).

In the drawing above we have a couple of apps and packages:

- **UI components**, this is where the front-end developers create their React components in [Storybook](https://storybook.js.org/) out of the context of the client's project or Sitecore
- **Next.js corporate app**, the Sitecore JSS Next.js SDK connecting to the Corporate JSS website setup in Sitecore. This app is depending on the UI components package.
- **Next.js career app**, the same as above but pointing at a different website within Sitecore.
- **Apps/storefront**, a fictional example of an app connected to [Sitecore Ordercloud](https://ordercloud.io/). This doesn't exist (yet), but it explains the need of creating components that can work in all sorts of applications within the same monorepo.

Why does a monorepo helps us scale?

- **Connect multiple (Next.js) apps with UI components**.
  This architecture allows us to set up multiple apps consuming the same set of components and other sharable code.

- **Perfect for letting FE developer focus on small parts (without Sitecore experience).**
  A front end developer might never have to leave Storybook. In fact, this might even help to create generic flexible components without project or Sitecore domain stuff built in.

- **Perfect for Sitecore devs to work on an app without having to worry about mark-up or styling.**
  They only have to worry about the contract, the difference between the data model from Sitecore and the property types set in the UI component. Just a bit of data-mapping instead of juggling HTML classes, divs and spans.

- **Using npm workspaces with Turborepo. Ensures easy task management and fast builds.**
  Turborepo uses caching for it's builds. That means that it only builds packages/apps that have changes. So even when the monorepo is huge, it will still perform with fast build times.

- **Multiple apps / packages share the same node_modules.**
  The same node_modules are shared across the apps and packages when the versions are the same. So also the "npm install" should remain fast.

## Component system / CSS JS

I'm a big fan of not re-inventing the wheel on simple components that exist on all projects (Accordion/Tabs etc). Although they are easily created from scratch I see a lot of examples that are built poorly or are not accessible. When using a base component system like [MUI](https://mui.com/) or [Reach](https://reach.tech/) you don't have to manually add the correct aria attributes and you're ensured they work using the keyboard, screen reader, etc.

For this project, I picked MUI as a base system for all our components. The components are great and easily customized (no it doesn't have to look like material UI) but you also get a good theming system based on [Emotion](https://emotion.sh/) (a styled component library).

This theming system allows you to create consistency in the design implementation. And all this while using the IntelliSense of Typescript.

Even when you don't want to use any of the components from MUI I would still consider using it as an Emotion boilerplate. It works great with Next.js apps (including the Sitecore [JSS Next.js SDK](https://github.com/Sitecore/jss/tree/dev/packages/sitecore-jss-nextjs)). The CSS is automatically code-split, meaning that you can have 100s of components in your application but still a small CSS/JS bundle for the end-user.

## Rules of engagement

Couple of rules I use on this project.

### Build your component with theme variables (support for multiple themes)

![Theme variables](/blog/theme-variables.png)
Avoid hard-coded spacing units and colors as much as possible. This way the components can be globally adjusted to be used in all sorts of contexts.

### Never use mark-up or styling in client-facing app

![No mark-up or styling](/blog/no-markup-or-styling.png)
Don't add class names or styling to the React components within you're Sitecore consuming Next.js apps. The whole point of this setup is to have a clear separation between UI components and Sitecore-related stuff. If this is done anyway, the design system created in Storybook is not leading anymore.

### Use Graphql aliases where possible

![Graphql Alias](/blog/graphql-alias.png)
When Graphql queries, [integrated or connected](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/integrated-graphql-in-jss-apps.html), the rendering will be more future-proof if aliases are used. If the property names change in the future, the rendering component will still work. Only the query will need to be changed.

## Connect component to Sitecore

Now when all the above is done, it's very easy to create a React rendering for Sitecore.
On the project, we specifically refer to **React renderings** within the Sitecore Next.js app. The components with the UI component package are called just components. This prevents confusion.

1. **Create a component within the JSS Next.js app as specified in Sitecore**
   ![Component name Sitecore](/blog/component-name.png)

2. **Component should get registered in the componentFactory.ts file automatically (using Sitecore JSS Bootstrap script)**
   ![Component factory](/blog/component-factory.png)

3. **Now, within the React rendering, refer to the component from the "UI components" package, map the properties from Sitecore to the model used in UI components and it's done!**
   ![Finished rendering](/blog/finished-rendering.png)
