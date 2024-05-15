#!/usr/bin/env node

const program = require('commander');

program.command('create <--name=string>', 'Create an actor');
program.command('get <--id=string>', 'Get an Actor');
program.command('list', 'List the Actors');

program.parse(process.argv);
