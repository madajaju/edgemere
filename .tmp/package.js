#!/usr/bin/env node

const program = require('commander');

program.command('build <--env=string> <--name=string> [--recursive=boolean]', 'Build an package');
program.command('create <--name=string>', 'Create an package');
program.command('get <--id=string>', 'Get the Packages');
program.command('install <--env=string> [--name=string] <--package=string>', 'Install an package');
program.command('list', 'List the Packages');
program.command('uninstall <--env=string> <--name=string> <--package=string>', 'Uninstall an app');

program.parse(process.argv);
