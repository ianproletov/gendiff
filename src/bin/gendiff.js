#!/usr/bin/env node

import genDiff from '..';
import program from 'commander';
import { defaultRender, plainRender } from '../renderers/rendererslist';

const renderMethods = { plain: plainRender };

program
  .version('0.0.7', '-V, --version')
  .description('Usage: gendiff [options]')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const method = (options.format ? renderMethods[options.format] : defaultRender);
    const result = genDiff(firstConfig, secondConfig, method);
    console.log(result);
  });
program.parse(process.argv);
