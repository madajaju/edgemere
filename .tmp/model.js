#!/usr/bin/env node

const program = require('commander');

program.command('create <--name=string> [--package=string]', 'Create an model');

program.parse(process.argv);
