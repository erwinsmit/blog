---
title: My frontend stack in 2023
date: '2023-08-31'
spoiler: My frontend stack in 2023, what are my choices and the reasoning behind them
---

My frontend stack in 2023, what are my choices and the reasoning behind them:

## The basics, same-old every year 
- **React**

React is still the safe choice, it's by far the most popular framework for building the components for the view in any project. 
Yes, Svelte, Vue, and Angular are all great too. But is there something those frameworks can do that React can't? 

- **Typescript**

Typescript is a no-brainer. There are no serious alternatives.

## Components
After doing some revision on custom build components (e.g. Accordions, Modals, etc) for accessibility improvements I made the decision I'm never going to build common UI patterns from scratch. 

So for some projects, I have used UI libraries. Mainly [MUI](https://mui.com/) and [FluentUI](https://react.fluentui.dev/?path=/docs/concepts-introduction--page). The developer experience with these libraries is great, you get accessibility out of the box, and the components are well thought out and flexible enough to match custom designs. However, they also have a problem called **CSS in JS**. More about this problem below (Styling). 

In the new composable world let's also make our components composable with a **Headless UI**.

Therefore I choose to work with [Radix](https://www.radix-ui.com/), a great library that covers the basic functionalities you need on every project (Tabs, Tooltip, etc) but can be styled with your favorite styling approach. 

Other libraries that do the same thing: [React Aria](https://react-spectrum.adobe.com/react-aria/), [Headless UI](https://headlessui.com/), and [Reach UI](https://reach.tech/).

## Styling
I have been a big fan of **CSS in JS** as an alternative to the SCSS projects using [BEM](https://getbem.com/). I love the fact that I don't have to switch contexts when I'm using variables in CSS or in TSX. Also, automatic refactoring and the "find all references" button in CSS code is something I would always miss writing SCSS/BEM. 

But, CSS in JS is not a good bet anymore. It's strongly discouraged to use CSS in JS with React server components.
Older server-side technologies have issues with CSS in JS too (e.g. [React.NET](https://github.com/reactjs/React.NET/issues/970)). 

[Good read from one of the Emotion maintainers](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) ([Emotion](https://emotion.sh/docs/introduction) is the engine behind MUI):

In my opinion, it would be a bad decision to build your front end using this technique if there is a chance it has to be server-side generated one day.

Unless I'm 100% sure the components are always used client-side only, I don't like to take that risk. Since we already have nice functional components from Radix (or another Headless UI) we just need CSS to make them look good. 

What are my options?

### SCSS with BEM 
Is of course capable of making the components look good, but I don't like to step back in developer experience. I have also seen too many projects where knowledge about the architecture was required to apply clean changes. As a result, when other developers worked on the project and applied quick changes, the quality of the codebase degraded making maintenance and future development hard. Plus, the mental effort it takes to come up with classes like "inner", "container" and "wrapper" feel like a waste. 

### Tailwind
[Tailwind](https://tailwindcss.com/) is great for its simplicity. It's great for React components because you never have to leave your TSX file, it's all right there. There is also no risk in breaking stuff by accident, everything is scoped to the component. But there are still two reasons that stop me from using Tailwind for a work project. 

1. **Controversy**

Developers who always took pride in setting up a clean SCSS architecture with nice names often hate Tailwind. I still want to be friends with those developers. 

2. **Typescript?**

You either need to become very good in mesmerizing Tailwind classes or use tooling to work well with Tailwind. There is also no compiler that slaps you in the face when you misspell a classname. 

### Vanilla Extract
In my opinion, [Vanilla Extract](https://vanilla-extract.style/) is a good "Everyone's friend". CSS in JS fans will like the Typescript support and the SCSS/BEM crew will like the way it's just like regular CSS and create nice descriptive class names. When switching from Tsx to Css.ts extensions I love the fact I don't have to switch syntax for accessing theme variables. When I access a theme variable that doesn't exist, the compiler will punish me for doing so but VS Code will warn me beforehand (unlike with SCSS). 

There are other tools that work in a similar way ([Stitches](https://stitches.dev/), [Panda CSS](https://panda-css.com/)). I don't really care if I ever have to use another one as they are all pretty similar. It's just a nice Typescript layer over regular CSS Modules. 

## Monorepo 
For monorepos, I like to use [NX](https://nx.dev/), I have used Lerna and NPM workspaces in the past. They also worked fine, but I had to think and do more stuff myself. 

NX delivers out of the box a nice developer experience with scaffolding scripts, task runners, etc. Monorepos helped me in creating isolated "UI component" packages, I will explain in a later blog post why I'm a fan of this. 


