---
title: Create scalable head for Sitecore JSS
date: '2022-09-17'
spoiler:  
---

I recently worked on a headless project with Sitecore, the way of working I choose there worked really well in my opinion. In this post I like to talk about the choices I made and how they helped the team creating a good workflow.

What do I mean with scalable in this context? With scalable I mean a few things:

- The head should be able to work with data model changes
- The head should be able to perform well even if there are hundreds of different components in the application
- The head should be able to look good in different color themes, different font-sizes, different spacings etc. 
- The team that develops the head should be able to scale well, they should be able to easily integrated on the project without any domain or Sitecore knowledge.

## Monorepo
Within the Monorepo I created a clear separation between UI components and the Sitecore JSS Next.js application. 
See the following drawing:

![Monorepo](monorepo.png)

This monorepo is using NPM workspaces in combination with Turborepo, this works good but there are a lot of similar tools that achieve the same things.
With monorepo's it's common to have "packages" and "apps". Packages refer to internal codebases and apps are meant for applications that will be seen by a non-technical end-user. See the example from Turborepo for an [excellent example](https://turborepo.org/docs/getting-started/create-new#2-exploring-your-new-repo).

In the drawing above we have a couple of Apps and Packages:
- UI components, this is where the front end developers create their React components out of the context of the client's project or Sitecore
- Next.js corporate app, the Sitecore JSS Next.js SDK connecting to the Corporate JSS website setup in Sitecore. This app is depending on the UI components package.
- Next.js career app, the same as above but pointing at a different website within Sitecore
- Apps/storefront, a fictional example of a app connected to Ordercloud. This doesn't exist (yet), but it explains the need of creating components that can work in all sorts of applications within the same monorepo.

## Component system / CSS JS
I'm a big fan of not re-inventing the wheel on simple components that exist on all projects (Accordion/Tabs etc). Although they are easily created from scratch I see a lot of examples that are build poorly or are not accessible. When using a base component system like [MUI](https://mui.com/) or [Reach](https://reach.tech/) you don't have to manually add the correct aria attributes and you're ensured they work using the keyboard, screen reader etc.

On this project I picked MUI as a base system for all our component. The components are great and easily customised (no it doesn't have to look like material UI) but you also get a good theming system based on [Emotion](https://emotion.sh/) (a styled component library). 

This theming system allows you to create consistency in the design implementation. And all this while using the intellisense of Typescript. 

Even when you don't want to use any of the components from MUI I would still consider using it as a Emotion boilerplate. It works great with Next.js apps (including the Sitecore JSS Next.js SDK). The CSS is automatically code-split, meaning that you can have 100s of components in your application but still a small CSS/JS bundle for the end-user. 

## Rules of engagement
Couple of rules I try to live by on this project.

### Build your component with theme variables (support for multiple themes)
![Theme variables](theme-variables.png)
Avoid hard-coded spacing units and colours as much as possible. This way the components can be globally adjusted to be used in all sorts of contexts. 

### Never use mark-up or styling in client facing app
![No mark-up or styling](no-markup-or-styling.png)
Don't add classnames or styling to the React components within you're Sitecore consuming Next.js apps. The whole point of this setup is to have a clear separation between UI components and Sitecore related stuff. If this is done anyway, the design system created in Storybook is not leading anymore.

### Use Graphql aliases where possible
![Graphql Alias](graphql-alias.png)
When Graphql queries, [integrated or connected](https://doc.sitecore.com/xp/en/developers/hd/190/sitecore-headless-development/integrated-graphql-in-jss-apps.html), the rendering will be more future-proof if aliases are used. If the property names change in the future, the rendering component will still work. Only the query will need to be changed.

### Use generic prop types (no domain/client related stuff)

## Connect component to Sitecore
Explain quickly how a component is added from ui-components into the Next.js app