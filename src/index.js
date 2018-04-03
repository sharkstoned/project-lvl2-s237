import fs from 'fs';
import _ from 'lodash';
import os from 'os';

const readFromFiles = (...args) => args.map(path => fs.readFileSync(path, 'utf8'));

const parseData = inputArr => inputArr.map(str => JSON.parse(str));

const compare = (data1, data2) => {
  const mergedKeys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)]));

  const writeKey = (acc, key) => {
    // added
    if (!_.has(data1, key)) {
      return `${acc}${os.EOL}  + ${key}: ${data2[key]}`;
    }

    // removed
    if (!_.has(data2, key)) {
      return `${acc}${os.EOL}  - ${key}: ${data1[key]}`;
    }

    // was not changed
    if (data1[key] === data2[key]) {
      return `${acc}${os.EOL}    ${key}: ${data1[key]}`;
    }

    // changed
    return `${acc}${os.EOL}  - ${key}: ${data1[key]}${os.EOL}  + ${key}: ${data2[key]}`;
  };

  return `{${mergedKeys.reduce(writeKey, '')}${os.EOL}}${os.EOL}`;
};

const genDiff = (path1, path2) => {
  const [first, second] = parseData(readFromFiles(path1, path2));

  return compare(first, second);
};

export default genDiff;
