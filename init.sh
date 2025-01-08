#!/bin/bash

cd ./libs || exit
./submodule.sh

npm install
cd ./test || exit
npm install
tsc

cd ../tsnode || exit
npm install
tsc

cd ../truthy || exit
npm install
tsc

cd ../tokenize || exit
npm install
tsc

cd ../mdpp || exit
npm install
tsc
