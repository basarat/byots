#!/bin/sh
set -e

npm install typescript@next --save-dev --save-exact

# TODO: build typescript with strip internals and const enum changed
# Official Microsoft/TypeScript clone
# cd ./TypeScript
