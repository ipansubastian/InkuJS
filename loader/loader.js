'use strict';
let fs = require('fs');
let vm = require('vm');

function load(file){
    let moduleDir = module.filename.split('/');
        moduleDir.pop();
        file = moduleDir.join('/') + `/${file}`;

    vm.runInThisContext(
        fs.readFileSync(file)
    );
}

load('../etc/blend.js');