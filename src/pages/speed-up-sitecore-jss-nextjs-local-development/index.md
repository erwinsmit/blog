---
title: Speed up Sitecore JSS Next.js local development
date: '2023-08-25'
spoiler: When a Sitecore JSS Next.js project grows, performance on local develop can suffer easily. Let's see how running your project in WSL can help.
---

Sitecore developers are traditionally .NET developers and .NET developers traditionally use Windows for their local development environments. 
However, for running Next.js applications locally, Windows is not the best OS in my opinion. Everything that runs with Node will likely perform better on a Linux system. 

But, for a while, it's possible to run a Linux environment on Windows using WSL. Setting WSL up for your development setup is done with the following steps: 

1. [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
2. [Set up WSL for VScode](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-vscode)
3. [Set up Node using NVM](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)

**Make sure your projects are installed in your ~/projects directory (not in /mnt, performance is awful in the /mnt directory)**

To be honest I don't have any hard evidence that running your projects on Linux is actually faster, I just had a feeling it always was.
Let's do some tests and see if (and how) much difference it actually makes.

Recently I worked on a Sitecore JSS Next.js project where the codebase is pretty big, with a lot of content, and lots of components using a Monorepo.

I've added a node script to measure the speed of *npm install* & *npm run build*. I used this [npm package](https://www.npmjs.com/package/execution-time) to measure and format time. 

**Time `npm run build` and `npm install`**
```javascript
const {execSync} = require('child_process')

const perf = require('execution-time')();

perf.start();

execSync("npm install");
//execSync("npm run build");

const results = perf.stop();
console.log(results.time / 1000); 
```

## The results
All seconds are an average of a couple of runs. Sometimes it was 2 seconds quicker or slower, never any big differences. 

### npm install
- **Windows**: ~80 seconds
- **WSL**: ~55 seconds

That makes WSL 30% faster on install. 

### npm run build
So the build contains a couple of tasks actually, the JSS bootstrap task and the Next.js Build. 
Here the timing was more consistent, I guess because there is no dependency on download speed.

- **Windows**: ~38 seconds
- **WSL**: ~31 seconds

So the builds on WSL run roughly 20% quicker. The difference doesn't seem big, but when developing locally these builds need to run all the time. 

Conclusion, For the amount of effort it requires, I think it's worth running the frontend of your projects in WSL. 
As an added benefit, you will also never get any [casing errors](https://learn.microsoft.com/en-us/windows/wsl/case-sensitivity).

I used Node version 18 for the tests on a
Dell XPS, 12th generation i7, 32GB RAM