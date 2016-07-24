# Bring your own TypeScript
[![Downloads](http://img.shields.io/npm/dm/byots.svg)](https://npmjs.org/package/byots)
[![BuildStatus](https://travis-ci.org/basarat/byots.svg)](https://travis-ci.org/basarat/byots)

**Use the latest** [**TypeScript**](https://github.com/Microsoft/TypeScript), **with complete access to the compiler API** 🌹

[![NPM](https://nodei.co/npm-dl/byots.png)](https://nodei.co/npm/byots/)

> Kudos to the TypeScript team for maintaining all the code that this project depends on. This project is just a minor automation on top.

Reasons Why:

* Releases everyday.
* `package.json` links you to typescript definitions
* Super Nice: We expose the internal APIs (the ones that have `/* internal */`)
* Super Nice: We expose the global `ts` variable. Just `require('byots')` once and start using `ts` like you are in the actual compiler source code.
* Super Nice: Converts `const enum` in the compiler definition to `enum`. This decreases the typescript compiler version dependence on your dev tools TS->JS emit.
* Takes `typescript@next` as a peer dependency and just re-exports it.

## Install
In your package.json

```sh
npm install byots@latest --save --save-exact
```

Each release is named after the day it was built and the git commit hash in Microsoft/TypeScript/master that it was built from. We recommend adding `save-exact` so you know exactly what you tested with.

## Usage

### Require
Use `require('byots')` and you get what `typescript` would give you.

### Global `ts`
In addition to returning what `typescript` returns we also expose `ts` as a global.

```ts
declare var require: any;
require('byots');
console.log(ts.createScanner);
```
Which makes it easy to use the compiler API if you are using it heavily. Note you only need to `require` *once from any* file.

# About
Note that this is a personal endeavor, not officially by Microsoft.
