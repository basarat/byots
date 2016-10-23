#!/bin/sh
set -e

commitVersion=`cat kicktravis`
commitName="[ci skip] Version: $commitVersion"

# NOTE: Checkout and merge with head is needed for travis
echo "Adding to git"
git add -A
git checkout master
git status

# Commit,tag,push,publish
echo "Committing"
git commit -m "$commitName"
echo "Pushing commit"
git push

echo "Tagging"
git tag $commitVersion
echo "Pushing tags"
git push --tags
