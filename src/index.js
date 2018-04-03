import fs from 'fs';
import _ from 'lodash';
import os from 'os';

const readFromFiles = (...args) => args.map(path => fs.readFileSync(path, 'utf8'));

const parseData = inputArr => inputArr.map(str => JSON.parse(str));

const compare = (data1, data2) => {
  const mergedKeys = [...Object.keys(data1), ...Object.keys(data2)];
  const uniqueKeys = Array.from(new Set(mergedKeys));

  const writeKey = (acc, key) => {
    const fillTemplate = (sign, dataObj) => `${acc}${os.EOL}  ${sign} ${key}: ${dataObj[key]}`;

    // added
    if (!_.has(data1, key)) {
      return fillTemplate('+', data2);
    }

    // removed
    if (!_.has(data2, key)) {
      return fillTemplate('-', data1);
    }

    // was not changed
    if (data1[key] === data2[key]) {
      return fillTemplate(' ', data1);
    }

    // changed
    return `${acc}${os.EOL}  - ${key}: ${data1[key]}${os.EOL}  + ${key}: ${data2[key]}`;
  };

  return `{${uniqueKeys.reduce(writeKey, '')}${os.EOL}}${os.EOL}`;
};

const genDiff = (path1, path2) => {
  const [first, second] = parseData(readFromFiles(path1, path2));

  return compare(first, second);
};

export default genDiff;
