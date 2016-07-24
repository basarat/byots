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
# git clean -xfd # deletes any untracted existing artifacts including node_modules
git fetch origin
git reset --hard origin/master

# Install everything
npm install

# Build to get a new `typescriptServices.d.ts` file
./node_modules/.bin/gulp local

# copy to the

# Reset sub typescript
git reset --hard origin/master
cd ..
