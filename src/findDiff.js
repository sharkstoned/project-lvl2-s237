import _ from 'lodash';
import os from 'os';

export default (data1, data2) => {
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
