# Bring your own TypeScript
[![Downloads](http://img.shields.io/npm/dm/byots.svg)](https://npmjs.org/package/byots)
[![BuildStatus](https://travis-ci.org/basarat/byots.svg)](https://travis-ci.org/basarat/byots)

**Use the latest** [**TypeScript**](https://github.com/Microsoft/TypeScript), **with complete access to the compiler API** 🌹

[![NPM](https://nodei.co/npm-dl/byots.png)](https://nodei.co/npm/byots/)


**Still Just TypeScript**

* `byots` will use whatever TypeScript version you install *in your application*. So you are actually using whatever TypeScript you bring in (recommend `npm install typescript@next`).

**But with the following advantages**

* Provide `ts` globally. If you are doing heavy TypeScript work this helps e.g. [alm](http://alm.tools) / atom-typescript / tslint all do this.
* With a better definition file. We expose the internal APIs (the ones that have `/* internal */`). It helps experiment by copy pasting from the TypeScript source code.

> The definitions are updated daily automatically and our version numbers match the TypeScript nightly version numbers.

## Install
In your package.json

```sh
npm install byots@latest --save --save-exact
```

Each release is named after the day it was built and the git commit hash in Microsoft/TypeScript/master that it was built from. We recommend adding `save-exact` so you know exactly what you tested with.

## Usage

### Require
Use `import * as ts from 'byots'` and you get what `require('typescript')` would give you.

### Global `ts`
In addition to returning what `typescript` returns we also expose `ts` as a global.

```ts
import 'byots';
console.log(ts.createScanner);
```
Which makes it easy to use the compiler API if you are using it heavily. Note you only need to `import` *once from any* file.

# About
Note that this is a personal endeavor, not officially by Microsoft.
