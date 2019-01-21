#!/usr/bin/env node

import genDiff from '..';

const program = require('commander');

program
  .version('0.0.1', '-V, --version')
  .option('-f, --format [type]', 'Output format')
  .description('Usage: gendiff [options]')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => genDiff(firstConfig, secondConfig));
program.parse(process.argv);
