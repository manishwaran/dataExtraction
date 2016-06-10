#!/bin/sh
set -e

source ~/.nvm/nvm.sh
nvm install 5.9
nvm use 5.9

npm version $GO_PIPELINE_LABEL
npm install
npm run build


#bundle as artifact
tar cvJf node_modules.tar.xz node_modules
rm -rf node_modules distribution

mkdir distribution
tar --exclude=src --exclude=.git --exclude=distribution -czf distribution/dataExtraction.tgz .
