#!/usr/bin/env node

const program = require('commander');

program.command('create <--name=string> [--model=string] [--package=string]', 'Create a Method in a Model');

program.parse(process.argv);
