import _ from 'lodash';

const props = [
  {
    check: (data1, data2, key) => !_.has(data1, key) && _.has(data2, key),
    getEntry(val1, val2) {
      return {
        state: 'added',
        value: val2,
      };
    },
  },
  {
    check: (data1, data2, key) => _.has(data1, key) && !_.has(data2, key),
    getEntry(val1) {
      return {
        state: 'removed',
        value: val1,
      };
    },
  },
  {
    check: (data1, data2, key) => _.isPlainObject(data1[key]) && _.isPlainObject(data2[key]),
    getEntry(val1, val2, func) {
      return {
        state: 'nestedComparison',
        children: func(val1, val2),
      };
    },
  },
  {
    check: (data1, data2, key) => !_.isEqual(data1[key], data2[key]),
    getEntry(val1, val2) {
      return {
        state: 'changed',
        value: val2,
        prevValue: val1,
      };
    },
  },
  {
    check: (data1, data2, key) => _.isEqual(data1[key], data2[key]),
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
    const { getEntry } = _.find(props, ({ check }) => check(data1, data2, key));

    return getEntry(data1[key], data2[key], buildAst);
  };

  return uniqueKeys.reduce((acc, key) => ({ ...acc, [key]: getPropsForEntry(key) }), {});
};

export default buildAst;
