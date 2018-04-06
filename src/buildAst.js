import _ from 'lodash';

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
