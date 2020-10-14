# Bring your own TypeScript
[![Downloads](http://img.shields.io/npm/dm/byots.svg)](https://npmjs.org/package/byots)
[![BuildStatus](https://travis-ci.org/basarat/byots.svg)](https://travis-ci.org/basarat/byots)

**Use the latest** [**TypeScript**](https://github.com/Microsoft/TypeScript), **with complete access to the compiler API** 🌹

[![NPM](https://nodei.co/npm-dl/byots.png)](https://nodei.co/npm/byots/)


**Still Just TypeScript**

* `byots` will use whatever TypeScript version you install *in your application*. So you are actually using whatever TypeScript you bring in. However we highly recommend `npm install typescript@next byots@latest` so you don't get any type definition - JavaScript inconsistencies.

**But with the following advantage**

With a liberal definition file. We expose internal APIs.

> The definitions are updated daily automatically and our version numbers match the TypeScript nightly version numbers.

If you are working with the TypeScript compiler using `import * as ts from 'typescript'` and `ts` has everything you need, then use that. Otherwise if you find some API that isn't available on `ts.` but you can see if you do `console.log(ts)`, then you would consider using `byots`.


## Install
In your package.json

```sh
npm install byots@latest --save --save-exact
```

Each release is named after the day it was built and the git commit hash in Microsoft/TypeScript/master that it was built from. We recommend adding `save-exact` so you know exactly what you tested with.

## Usage

### Require
Use `import * as ts from 'byots'` and you get what `import * as ts from 'typescript'` would give you.


# Alternatives

## ts-expose-internals

https://github.com/nonara/ts-expose-internals
* `ts-expose-internals` builds for new releases only to provide better stability - `byots` is nightly for bleeding edge experimentation.
* `ts-expose-internals` uses module augmentation so you `import typescript` - `byots` reexports typescript so you `import byots`.
