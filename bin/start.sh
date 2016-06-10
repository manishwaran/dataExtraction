#!/bin/bash
set -e

source /.nvm/nvm.sh
nvm install 5.9
nvm use 5.9

tar xvJf ./node_modules.tar.xz
rm node_modules.tar.xz
npm -f rebuild

npm start
