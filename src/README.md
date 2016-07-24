# WHAT's HERE

* the `tsconfig.json` is copied from typescript `services/tsconfig.json` and we use this to build out TypeScript. Modifications:
    * to `"stripInternal": false,`
    * fixed `outFile` to be what we wanted.
    * replaced `files` with `include`
        * this is easier to keep this up to date. Since all we want are defs anyways ordering doesn't matter to us.
