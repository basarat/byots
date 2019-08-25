/**
 * We use this script to do some minor post build cleanups
 */

/**
 * Utilities
 */
declare var require, __dirname;
var fs = require('fs');
var EOL: string = require('os').EOL;
export function readFile(filePath: string): string {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
export function writeFile(filePath: string, content: string) {
    fs.writeFileSync(__dirname + '/' + filePath, content);
}
export function stringify(object: Object, eol: string = '\n'): string {
    var cache = [];
    var value = JSON.stringify(object,
        // fixup circular reference
        function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        },
        // indent 2 spaces
        2);
    value = value.split('\n').join(eol) + eol;
    cache = null;
    return value;
}

/**
 * I think the `const enum` causes more pain than its worth for dev tools (everything needs to be rebuilt).
 * So change to enum to prevent inlining
 */
const dtsFilePath = '../bin/typescript.d.ts';
writeFile(dtsFilePath, readFile(dtsFilePath).replace(/const enum /g, 'enum '));

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

// Write it out
writeFile(packageJsonFilePath,stringify(pkg));
// Also write to kicktravis for usage
writeFile('../kicktravis',ourVersion);
