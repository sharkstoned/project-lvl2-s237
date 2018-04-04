import _ from 'lodash';
import os from 'os';

export default (data1, data2) => {
  const uniqueKeys = _.union(_.keys(data1), _.keys(data2));

  const makeDiffEntry = (key) => {
    const makeString = (sign, dataObj) => `${os.EOL}  ${sign} ${key}: ${dataObj[key]}`;

    const wasAdded = () => !_.has(data1, key);
    const wasRemoved = () => !_.has(data2, key);
    const wasChanged = () => data1[key] !== data2[key];

    if (wasAdded()) {
      return `${makeString('+', data2)}`;
    }

    if (wasRemoved()) {
      return `${makeString('-', data1)}`;
    }

    if (wasChanged()) {
      return `${makeString('-', data1)}${makeString('+', data2)}`;
    }

    return `${makeString(' ', data1)}`;
  };

  const entries = uniqueKeys.reduce((acc, key) => `${acc}${makeDiffEntry(key)}`, '');

  return `{${entries}${os.EOL}}${os.EOL}`;
};
