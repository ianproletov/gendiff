#!/usr/bin/env node
import genDiff from '..';
import program from 'commander';

program
  .version('0.0.8', '-V, --version')
  .description('Usage: gendiff [options]')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const result = genDiff(firstConfig, secondConfig, options.type);
    console.log(result);
  });
program.parse(process.argv);
