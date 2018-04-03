import fs from 'fs';
import os from 'os';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const readFromFiles = (...args) => args.map(file => ({
  ext: path.extname(file),
  data: fs.readFileSync(file, 'utf8'),
}));

const getParser = (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    default:
      return JSON.parse;
  }
};

const parseConfigs = inputArr => inputArr.map((config) => {
  const parse = getParser(config.ext);

  return parse(config.data);
});

const compare = (data1, data2) => {
  const mergedKeys = [...Object.keys(data1), ...Object.keys(data2)];
  const uniqueKeys = Array.from(new Set(mergedKeys));

  const makeDiffEntry = (acc, key) => {
    const makeString = (sign, dataObj) => `${os.EOL}  ${sign} ${key}: ${dataObj[key]}`;

    // added
    if (!_.has(data1, key)) {
      return `${acc}${makeString('+', data2)}`;
    }

    // removed
    if (!_.has(data2, key)) {
      return `${acc}${makeString('-', data1)}`;
    }

    // was not changed
    if (data1[key] === data2[key]) {
      return `${acc}${makeString(' ', data1)}`;
    }

    // changed
    return `${acc}${makeString('-', data1)}${makeString('+', data2)}`;
  };

  return `{${uniqueKeys.reduce(makeDiffEntry, '')}${os.EOL}}${os.EOL}`;
};

const genDiff = (path1, path2) => {
  const [first, second] = parseConfigs(readFromFiles(path1, path2));

  return compare(first, second);
};

export default genDiff;
