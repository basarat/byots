#!/bin/sh
set -e

# Get the latest typescript built version
# Helps with 
#  - getting the version numbers
#  - compiling our code
npm install typescript@next --save-dev --save-exact

#
# Build typescript with strip internals
#

# Official Microsoft/TypeScript clone
cd ./TypeScript

# Get latest
git clean -xfd # deletes any untracted existing artifacts including node_modules
git fetch origin
git reset --hard origin/master

# Install everything
npm install

# Build our scripts using official nightly TypeScript
../node_modules/.bin/tsc -p ../tsconfig.json

# Some pre build fixes
node ../lib/preBuild.js

# Build the compiler
npm run build:compiler

# Finally just take the new typescript.d.ts
mv ./built/local/typescriptServices.d.ts ../bin/typescript.d.ts

# Some post build fixes
node ../lib/postBuild.js

# Reset sub typescript
git reset --hard origin/master
cd ..
