/**
 * We use this script to do some minor post build cleanups
 */

import * as utils from './utils';

const fixesForFiles: utils.FixesForFile[] = [
  {
    filePath: '../bin/typescript.d.ts',
    fixes: [
      /**
       * I think the `const enum` causes more pain than its worth for dev tools (everything needs to be rebuilt).
       * So change to enum to prevent inlining
       */
      {
        orig: /const enum /g,
        new: 'enum '
      },
      /** 
       * Don't depend on `@microsoft/typescript-etw`
       */
      {
        orig: 'type PerfLogger = typeof import("@microsoft/typescript-etw");', new: '',
      },
      {
        orig: 'export const perfLogger: PerfLogger;', new: '',
      }
    ]
  },
]

utils.runFixesforFiles(fixesForFiles);

/**
 * Also get the version number for current ts nightly and use it to power our version number
 */
const packageJsonFilePath = '../package.json';
const pkg = require(packageJsonFilePath);
const tsVersion = require(packageJsonFilePath).devDependencies.typescript;
console.log('TypeScript nightly version:', tsVersion);

const now = new Date();
const ourVersion = tsVersion + '.' + now.getUTCHours() + '.' + now.getUTCMinutes();
pkg.version = ourVersion;

utils.writeFile(packageJsonFilePath, utils.stringify(pkg));


/** 
 * Also write to kicktravis for easy debugging
 */
utils.writeFile('../kicktravis', ourVersion);
