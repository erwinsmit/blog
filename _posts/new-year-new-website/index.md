---
title: New year, new website
date: "2025-01-03"
spoiler: Time to retire the old Gatsby setup and move to Next.js but still use GitHub pages for hosting.
---

My website used to run on Gatsby, inspired by Dan Abramov's old [overreacted blog](https://github.com/gaearon/overreacted.io/tree/main). To update all the dependencies, there were too many breaking changes, so I thought I might as well change to Next.js. I wanted to change my website for a while since I'm now a freelance developer. I still keep all the (older) blog items but added my profile and projects to the homepage.

Migrating the blog was pretty easy. The blog posts are written in Markdown; all I had to do was change the way they are built into pages.

Vercel would've been the easiest way to host the website; however, I like the way the website used to run on GitHub Pages as part of the repository. This website can easily run as a static website, so GitHub Pages is ideal.

**Three steps to host Next.js on GitHub Pages:**

1. **Add static export to next.config.ts**

```typescript
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  distDir: "dist",
};
```

Unfortunately, static Next.js [can't optimize the images](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features) for you with the standard loader, so make sure you do this yourself!

2. **Create publish task**

```json
"scripts": {
    "publish": "next build && cpx CNAME dist && gh-pages -b gh-pages -d dist"
}
```

This script builds the website, copies the CNAME file to the dist directory and pushes the dist directory to the gh-pages branch.

3. **Create GitHub action**

```yml
name: Publish website

on:
  push:
    branches: [main]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/erwinsmit/blog
      - run: npm ci
      - run: npm run publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Although you can publish the changes locally, using a pipeline is a nicer way of publishing the website. Each time the main branch is updated, the website is now automatically built and published.

Check out [the blog on GitHub!](https://github.com/erwinsmit/blog)
