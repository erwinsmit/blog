---
title: Auto-format typescript with a npm task
date: "2022-10-02"
spoiler: To help keep non-JavaScript developers from encountering issues when making changes to a React rendering, a simple npm task can be added to the project's package.json file to automatically format typescript using Prettier and ESLint rules. This keeps the code consistent without requiring additional tooling to be installed.
---

In a [previous post](/blog/scalable-head), I wrote about the workflow of a headless Sitecore project.
One of the things I like to do is add formatting rules with ESLint and Prettier. On the pull request build, I check if those rules are applied correctly before the code is allowed to be merged in.

## Do Sitecore developers like this?

Not always, when a Sitecore developer who is less involved in the whole JavaScript world tries to make some changes in a React rendering you can get some issues. If they don't have Prettier installed in their code editor it will be inevitable that they will get errors on the PR build.

How can they fix this easily without all the tooling installed?

By adding this simple npm task to your project's package.json:

```JSON
"scripts": {
    "fix-format": "eslint --ext js,ts,tsx src --fix && prettier --write \"src/**/*.{ts,tsx}\""
},
```

Running this task will automatically format the typescript using the rules set by Prettier and ESLint.

Keep the code nice and consistent without annoying the non-JavaScript developers!
