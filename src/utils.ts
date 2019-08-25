/**
 * Utils
 */
declare global {
  var process, require, __dirname;
}

const fs = require('fs');

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
    function (key, value) {
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

interface Fix {
  orig: string | RegExp;
  new: string;
}
export interface FixesForFile {
  filePath: string,
  fixes: Fix[],
  additions?: string,
}

export function runFixesforFiles(fixes: FixesForFile[]) {
  fixes.forEach(fff => {
    let content = readFile(fff.filePath);
    content = content.split(/\r\n?|\n/).join('\n');
    fff.fixes.forEach(fix => {
      if (typeof fix.orig === 'string') {
        const orig = fix.orig.split(/\r\n?|\n/).join('\n').trim();
        if (content.indexOf(orig) === -1) {
          // OH OH . Fix no longer valid
          console.log('FIX ORIG NOT FOUND:', fff.filePath);
          console.log(fix)
          process.exit(1);
        }
        content = content.replace(orig, fix.new);
      }
      else {
        if (fix.orig.test(content) == null) {
          // OH OH . Fix no longer valid
          console.log('FIX ORIG NOT FOUND:', fff.filePath);
          console.log(fix)
          process.exit(1);
        }
        content = content.replace(fix.orig, fix.new);
      }
    })
    if (fff.additions) {
      content = content + fff.additions;
    }
    writeFile(fff.filePath, content);
  })
}
