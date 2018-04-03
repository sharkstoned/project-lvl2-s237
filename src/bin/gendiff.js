#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import fs from 'fs';
import genDiff from '..';

const makeAbsolutePath = relative => path.resolve(process.cwd(), relative);

const pkg = JSON.parse(fs.readFileSync('../../package.json', 'utf8'));

program
  .version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format');

program.action((path1, path2) => {
  const fullPath1 = makeAbsolutePath(path1);
  const fullPath2 = makeAbsolutePath(path2);
  console.log(genDiff(fullPath1, fullPath2));
});

program.parse(process.argv);
