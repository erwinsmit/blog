---
title: Creating local npm package for sharing between multiple react applications
date: '2019-09-16'
spoiler: Using rollup to create transpiled code
---

## The usecase
At the project I'm working on currently we have multiple react apps running alongside of each other. These apps are using "Create react app", we like using CRA because of all the best practices it enforces on the user and the fact that it's well maintained by people that know their way around a webpack configuration. 

One of the best practices it enforces is that you are not allowed to include files from outside of the src directory. 
So if you want to share code between multiple react applications the only (non-hacky) way is to create npm packages that contain transpiled code. The code has to be transpiled because CRA will only do the compile step on npm packages. 

### Tools
To achieve this we use LernaJS to link all the dependencies to the correct react applications. Maybe I will write another blog post about this later but for now I will simply list the directory structure:

- CRA application 1
- CRA application 2
- ClientCore (our local npm package)

In the react applications we can include the "ClientCore" dependency in the package.json. When we run `lerna bootstrap` it will create symlinks in the "node_modules" directory to our local package.

The tool we use to transpile our "ClientCore" package is Rollup. Let's get started with that!

### Rollup config
I prefer to set all the rollup configuration in a separate file and link to it in your package.json.

```json
"scripts": {
    "transpile": "rollup --config ./rollup.config.js"
},
```

The basic rollup configuration can look like this

```javascript
export default {
    input: 'index.ts',
    output: [
        {
            file: 'dist/index.js' ,
            format: 'cjs',
        },
        {
            file: 'dist/index.es.js'
            format: 'esm'
        }
    ]
}
```

This is all you need to transpile your bundle to CommonJS and ES modules. I find this enough because I don't need to support applications that want a UMD/IFFE build which can load straight into the browser. If you are writing a NPM module for the whole world to use you can consider adding these formats as well. 

Next add the pointer to the dist map to the package.json file:
```json
  "main": "dist/index.js",
  "module": "dist/index.es.js",
```

Main refers to the CJS build and module to the ES build.

### Typescript support
Because we use typescript we also need a plugin to transpile this correctly and give us errors when make a mistake. To add typescript support you can add this to the top of the configuration file (and install the dependency).
 
`import typescript from 'rollup-plugin-typescript2'`

Next you add a new entry to the rollup config to specify the plugins.
```javascript
plugins: [ typescript() ] 
```
To also automatically generate type definitions (d.ts files) add these two lines to your tsconfig.json:
```json
"declaration": true,
"declarationDir": "./dist" 
```

### Gotcha's - lazy loading & commonJS
When using a client side application the only reason to use the CJS build is for dynamic imports (lazy loading) as far as I'm aware. The big difference between the CJS and ES build is that everything will always be imported. 

For example, when your module exports 2 functions:
```typescript
export function test() {
    return 'testing 12'
}

export default () => {
    return 'default'
}
```

And in your react application you import test
```typescript
const test = require('ClientCore').test

```
You also get the all the other stuff from that javascript file. But when you import `test` using ES modules you only get the code you actually need.

```typescript
import { test } from 'ClientCore'
```
So always keep this in mind when you want to lazy-load javascript or when you are changing modules that could be lazy loaded somewhere! A misplaced import could suddenly make your lazy loading strategy worthless.

### Gotcha's - circular dependencies
What's a circular dependency? The most simple case of a circular dependecy looks like this:
```typescript
- Dep1.ts

import { dep2Function } from './dep2.ts'

export function dep1Function() {

}


- Dep2.ts

import { dep1Function  } from './dep2.ts'

export function dep2Function() {

}
```

This is the most simple case of circular dependency. You should of course avoid to write code like this but there are also much more complicated cases of circular dependencies. Rollup will give you warnings about this and rightly so. Circular dependencies can create very hard to track down bugs when the dependencies hold some state or when they extend classes. 

To tackle these bugs I found this great [blogpost](https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de) that explains how to use the `internal module pattern` to resolve this.

Basically all you have to do is to handle all the exports / imports using an internal.ts file.

So to fix our case from above the code should be:
```typescript
- Dep1.ts

import { dep2Function } from './internal.ts'

export function dep1Function() {

}

- Dep2.ts

import { dep1Function  } from './internal.ts'

export function dep2Function() {

}

- internal.ts
export * from './dep1.ts'
export * from './dep2.ts'
```









