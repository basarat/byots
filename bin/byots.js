var ts = require('typescript');
module.exports = ts;
if (typeof global !== 'undefined') {
    global.ts = ts;
}
if (typeof window !== 'undefined') {
    window.ts = ts;
}
