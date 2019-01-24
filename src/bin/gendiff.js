#!/usr/bin/env node

import genDiff from '..';
import commander from 'commander';

commander
  .version('0.0.1', '-V, --version')
  .option('-f, --format [type]', 'Output format')
  .description('Usage: gendiff [options]')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig);
    console.log(result);
  });
commander.parse(process.argv);
