#!/usr/bin/env node

const program = require('commander');

const action = require('C:/Users/darre/work/edgemere/node_modules/ailtire/src/interface/app/docs.js');
const ActionHandler = require('C:/Users/darre/work/edgemere/node_modules/ailtire/src/Server/Action.js');
global.ailtire = { config: require('C:/Users/darre/work/edgemere/node_modules/ailtire/bin/lib/../../.ailtire.js') };
program;
program.parse(process.argv);
let results = ActionHandler.execute(action,program.opts(), {});
console.log(results);
