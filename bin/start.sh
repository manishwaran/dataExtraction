#!/bin/bash
set -e

source ~/.nvm/nvm.sh
nvm install 5.9
nvm use 5.9

npm install

npm start
