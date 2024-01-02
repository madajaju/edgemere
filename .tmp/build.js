#!/usr/bin/env node

const program = require('commander');

const action = require('C:/Users/dwpulsip/IdeaProjects/edgemere/node_modules/ailtire/src/interface/app/build.js');
const ActionHandler = require('C:/Users/dwpulsip/IdeaProjects/edgemere/node_modules/ailtire/src/Server/Action.js');
global.ailtire = { config: require('C:/Users/dwpulsip/IdeaProjects/edgemere/node_modules/ailtire/bin/lib/../../.ailtire.js') };
program
	.requiredOption('--env <string>', 'Environment to Build')
	.option('--name <string>', 'Name of the Build')
	.option('--repo <string>', 'undefined')
	.option('--recursive <boolean>', 'undefined');
program.parse(process.argv);
let results = ActionHandler.execute(action,program.opts(), {});
console.log(results);
