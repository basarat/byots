#!/bin/sh
set -e

# Get the latest typescript built version
# Helps with getting the version numbers
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

# Run a jake task to get the `diagnosticInformationMap.generated.ts` file
npm run build:compiler

# Copy our tsconfig.json to do the building
cp ../src/tsconfig.json ./src/tsconfig.json

# Now build the compiler with our tsconfig.json using nightly typescript to get new definitions
../node_modules/.bin/tsc -p ./src

# Finally just take the new typescript.d.ts
mv ./built/local/typescriptServices.d.ts ../bin/typescript.d.ts

# Some post build fixes
node ../scripts/postBuild.js

# Reset sub typescript
git reset --hard origin/master
cd ..
