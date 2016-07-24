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

git clean -xfd
git fetch origin
git reset --hard origin/master


# Reset sub typescript
git reset --hard origin/master
cd ..
