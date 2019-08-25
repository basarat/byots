/**
 * We use this script to do some minor post build cleanups
 */

import * as utils from './utils';

/**
 * I think the `const enum` causes more pain than its worth for dev tools (everything needs to be rebuilt).
 * So change to enum to prevent inlining
 */
const fixesForFiles: utils.FixesForFile[] = [
    {
        filePath: '../bin/typescript.d.ts',
        fixes: [
          {
            orig: /const enum /g,
            new: 'enum '
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
