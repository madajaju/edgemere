#!/usr/bin/env node

const program = require('commander');

program.command('create <--name=string> <--usecase=string> [--package=string]', 'Create an Scenario in a UseCase');
program.command('get <--id=string>', 'Get a Scenario in a UseCase');
program.command('launch <--id=string>', 'Launch a Scenario in a UseCase');

program.parse(process.argv);
