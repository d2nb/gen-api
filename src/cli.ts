#!/usr/bin/env node
import path from 'path';
import minimist from 'minimist';
import { genApi } from './index';

const argv = minimist(process.argv.slice(2), {
  alias: {
    i: 'input',
    o: 'output',
  },
});

const {
  input = './openapi.json',
  output = './src/api',
} = argv;

const cwd = process.cwd();

genApi({
  input: path.resolve(cwd, input),
  output: path.resolve(cwd, output),
});
