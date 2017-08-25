"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
function readFile(filePath) {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
exports.readFile = readFile;
function writeFile(filePath, content) {
    fs.writeFileSync(__dirname + '/' + filePath, content);
}
exports.writeFile = writeFile;
var fixesForFiles = [
    {
        filePath: '../TypeScript/src/services/refactors/extractMethod.ts',
        fixes: [
            {
                orig: 'const enum Usage',
                new: 'export const enum Usage'
            }
        ]
    }
];
fixesForFiles.forEach(function (fff) {
    var content = readFile(fff.filePath);
    content = content.split(/\r\n?|\n/).join('\n');
    fff.fixes.forEach(function (fix) {
        if (typeof fix.orig === 'string') {
            var orig = fix.orig.split(/\r\n?|\n/).join('\n').trim();
            if (content.indexOf(orig) === -1) {
                console.log('FIX ORIG NOT FOUND:', fff.filePath);
                console.log(fix);
                process.exit(1);
            }
            content = content.replace(orig, fix.new);
        }
        else {
            if (fix.orig.test(content) == null) {
                console.log('FIX ORIG NOT FOUND:', fff.filePath);
                console.log(fix);
                process.exit(1);
            }
            content = content.replace(fix.orig, fix.new);
        }
    });
    if (fff.additions) {
        content = content + fff.additions;
    }
    writeFile(fff.filePath, content);
});
