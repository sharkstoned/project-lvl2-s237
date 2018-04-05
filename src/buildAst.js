import _ from 'lodash';
import os from 'os';

const props = [
  {
    check: (val1, val2) => !val1 && val2,
    getEntry(val1, val2) {
      return {
        state: 'added',
        value: val2,
      };
    },
  },
  {
    check: (val1, val2) => val1 && !val2,
    getEntry(val1) {
      return {
        state: 'removed',
        value: val1,
      };
    },
  },
  {
    check: (val1, val2) => _.isPlainObject(val1) && _.isPlainObject(val2),
    getEntry(val1, val2, func) {
      return {
        state: 'nestedComparison',
        children: func(val1, val2),
      };
    },
  },
  {
    check: (val1, val2) => !_.isEqual(val1, val2),
    getEntry(val1, val2) {
      return {
        state: 'changed',
        value: val2,
        prevValue: val1,
      };
    },
  },
  {
    check: (val1, val2) => _.isEqual(val1, val2),
    getEntry(val1) {
      return {
        state: 'remains',
        value: val1,
      };
    },
  },
];

const buildAst = (data1, data2) => {
  const uniqueKeys = _.union(_.keys(data1), _.keys(data2));

  const getPropsForEntry = (key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const { getEntry } = _.find(props, ({ check }) => check(value1, value2));

    return getEntry(value1, value2, buildAst);
  };

  return uniqueKeys.reduce((acc, key) => ({ ...acc, [key]: getPropsForEntry(key) }), {});
};

export default buildAst;

const legacy = (data1, data2) => {
  const uniqueKeys = _.union(_.keys(data1), _.keys(data2));

  const makeDiffentry = (key) => {
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

  const entries = uniqueKeys.reduce((acc, key) => `${acc}${makeDiffentry(key)}`, '');

  return `{${entries}${os.EOL}}${os.EOL}`;
};
