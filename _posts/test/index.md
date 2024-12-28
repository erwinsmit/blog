---
title: Sitecore XM Cloud multisite styling
date: "2024-01-17"
spoiler: How do you conditionally render a stylesheet based on the SXA site
---

I started working on an interesting Sitecore headless project, so it's time to start blogging about my findings again!
Currently, I'm working on a project where a SXA multisite setup is migrated to XM Cloud.

Handling the multisite setup is now very easy thanks to the [multisite Next.js addon](https://doc.sitecore.com/xp/en/developers/hd/21/sitecore-headless-development/the-next-js-multisite-add-on.html) provided by the JSS team.

However, one thing I can't find in the documentation, how do you use a specific stylesheet for each SXA site?
We are leaving the styling as-is, so I want to load the existing SCSS files into Next.js.

In Next.js you can add your SCSS to the application with a simple import:

```javascript
import "scss/styles.scss";

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <>
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <Component {...rest} />
      </I18nProvider>
    </>
  );
}
```

The problem I have here, you only know which site you are on **within** the App function. And within the App function, it's not possible to import SCSS. With a couple of steps, I have worked around this.

## 1. Build your SCSS yourself

Instead of using Next.js to build the SCSS, setup a webpack file yourself:

```javascript
module.exports = {
    entry: {
        siteA: ['./scss/siteA/main.scss'],
        siteB: ['./scss/siteB/main.scss'],
    },
    output: {
        path: path.join(__dirname, 'public/static'),
    },
    module: {
        rules: [
            {
                // Using MiniCssExtractPlugin to write the output to its own file.
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require("sass"),
                        }
                    }
                ]
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => `${chunk.name.replace('/js/', '/css/')}.css`,
        })
    ]
```

Now add the following tasks to your package.json:

```json
"build:scss": "rimraf public/static && webpack --config webpack.scss.config.js --mode production",
"scss:watch": "rimraf public/static && webpack --config webpack.scss.config.js --mode development --watch",
```

Add the watch and build tasks to the existing start and build scripts so they are run during development and build:

```json
"build": "npm-run-all --serial bootstrap next:build build:scss",
"start:connected": "npm-run-all --serial bootstrap --parallel next:dev start:watch-components scss:watch",
```

As you notice I am using the `public/static` directory for build assets, so it's a good idea to add `public/static` to your .gitignore file and remove the directory on each build (using [rimraf](https://www.npmjs.com/package/rimraf) in the example).

In the `_app.tsx` you can now refer to the correct stylesheet based on the SXA site:

```javascript
/* eslint-disable @next/next/no-css-tags */
function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <>
    <Head>
      <link rel="stylesheet" href={`/static/${(pageProps.site.name)}.css`} />
    </Head>
```

I added the `/* eslint-disable @next/next/no-css-tags */` line because [Next.js doesn't like it](https://nextjs.org/docs/messages/no-css-tags) when you add CSS with a regular stylesheet link. I think this is silly, we have been adding stylesheets this way for 20 years. So I have no problem using this eslint-disable line. I'm also not seeing any performance concerns here.

## 2. What about caching?

By default the public directory from Next.js does not cache, see my [previous blog post](https://www.erwinsmit.com/caching-nextjs-public-directory/) on how to resolve that. How do you make sure users don't see a stale version when new CSS is deployed?

First, I tried to use the `BUILD_ID` (located in the .next directory) from Next as a prefix to the CSS path. However, that can't be accessed on build-time because the `BUILD_ID` is not generated until the build is actually complete.

So instead, I decided to use the current **commit hash**, meaning that with each build there will automatically be a fresh CSS file with a long cache-header.

First, create a script that returns a short version of the commit hash:

**getCommitHash.js**

```javascript
const getCommitHash = function () {
  return require("child_process").execSync('git log --pretty=format:"%h" -n1').toString().trim();
};

module.exports = getCommitHash;
```

In the webpack config responsible for building the CSS, place the CSS files in a path containing the commit hash:

```javascript
module.exports = {
    entry: {
        siteA: ['./scss/siteA/main.scss'],
        siteB: ['./scss/siteB/main.scss'],
    },
    output: {
        path: path.join(__dirname, 'public/static', getCommitHash()),
    },
```

Expose the commit hash as an environment variable in the next.config.js:

```javascript
const nextConfig = {
  env: {
    PUBLIC_URL: publicUrl,
    COMMIT_HASH: getCommitHash(),
  },
```

And refer to this environment variable in the \_app.tsx:

```javascript

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  return (
    <>
    <Head>
      <link rel="stylesheet" href={`/static/${process.env.COMMIT_HASH}/${(pageProps.site.name)}.css`} />
    </Head>
```

That's it! Now you have a unique stylesheet on each SXA site without any caching problems. Hope you find it useful.
