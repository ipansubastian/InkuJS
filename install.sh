#!/bin/bash

if [ ! -d node_modules ]; then
        mkdir node_modules;
fi;

if [ ! -d InkuJS ]; then
        git clone https://github.com/zyddv/InkuJS
fi;

if [ -f 'node_modules/inkujs' ]; then
        rm -rf node_modules/inkujs
fi;

mv InkuJS node_modules/inkujs

echo -e '\e[32mInstallasi berhasil!'              
