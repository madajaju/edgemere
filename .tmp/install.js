#!/usr/bin/env node

const program = require('commander');

const action = require('C:/Users/dwpulsip/AppData/Roaming/npm/node_modules/ailtire/src/interface/app/install.js');
const ActionHandler = require('C:/Users/dwpulsip/AppData/Roaming/npm/node_modules/ailtire/src/Server/Action.js');
global.ailtire = { config: require('C:/Users/dwpulsip/AppData/Roaming/npm/node_modules/ailtire/bin/lib/../../.ailtire.js') };
program
	.requiredOption('--env <string>', 'Environment to Build')
	.option('--name <string>', 'Name of the Installation')
	.option('--repo <string>', 'Name of the Repository for the docker images');
program.parse(process.argv);
let results = ActionHandler.execute(action,program.opts(), {});
console.log(results);
