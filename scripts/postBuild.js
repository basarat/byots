"use strict";
var fs = require('fs');
var EOL = require('os').EOL;
function readFile(filePath) {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
exports.readFile = readFile;
function writeFile(filePath, content) {
    fs.writeFileSync(__dirname + '/' + filePath, content);
}
exports.writeFile = writeFile;
function stringify(object, eol) {
    if (eol === void 0) { eol = '\n'; }
    var cache = [];
    var value = JSON.stringify(object, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }
            cache.push(value);
        }
        return value;
    }, 2);
    value = value.split('\n').join(eol) + eol;
    cache = null;
    return value;
}
exports.stringify = stringify;
var dtsFilePath = '../bin/typescript.d.ts';
writeFile(dtsFilePath, readFile(dtsFilePath).replace(/const enum /g, 'enum '));
var packageJsonFilePath = '../package.json';
var pkg = require(packageJsonFilePath);
var tsVersion = require(packageJsonFilePath).devDependencies.typescript;
console.log('TypeScript nightly version:', tsVersion);
var now = new Date();
var ourVersion = tsVersion + '.' + now.getUTCHours() + '.' + now.getUTCMinutes();
pkg.version = ourVersion;
writeFile(packageJsonFilePath, stringify(pkg));
writeFile('../kicktravis', ourVersion);
