#!/bin/sh
set -e

git submodule update --recursive --init

# TODO: build typescript with strip internals and const enum changed
# Official Microsoft/TypeScript clone
# cd ./TypeScript

npm install typescript@

# Reset sub typescript
git reset --hard origin/master
cd ..
