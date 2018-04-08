import _ from 'lodash';

const basicLength = 4;

const getPrefix = (sign = ' ') => `${' '.repeat(basicLength - 2)}${sign} `;

const getIndent = (multiplier) => {
  if (multiplier <= 0) {
    return '';
  }

  return `${' '.repeat(basicLength * (multiplier))}`;
};

const indentateEntry = (entry, level) => {
  const firstIndent = getIndent(level - 1);
  const restIndent = getIndent(level);

  const [first, ...rest] = entry.split('\n');

  return rest.reduce((acc, string) => `${acc}${restIndent}${string}\n`, `${firstIndent}${first}\n`);
};

const stringify = (valueToCheck, nestingLevel = 1) => {
  if (!_.isPlainObject(valueToCheck)) {
    return valueToCheck;
  }

  const objValue = valueToCheck;
  const prewrapped = _.keys(objValue)
    .reduce((acc, key) => `${acc}${`${getIndent(nestingLevel)}${key}: ${stringify(objValue[key], nestingLevel + 1)}\n`}`, '');

  return `{\n${prewrapped}${getIndent(nestingLevel - 1)}}`;
};

const render = (tree, nestingLevel) => {
  const keys = _.keys(tree);

  const handlers = {
    added: (key, props) => indentateEntry(`${getPrefix('+')}${key}: ${stringify(props.value)}`, nestingLevel),

    removed: (key, props) => indentateEntry(`${getPrefix('-')}${key}: ${stringify(props.value)}`, nestingLevel),

    remains: (key, props) => indentateEntry(`${getPrefix()}${key}: ${stringify(props.value)}`, nestingLevel),

    changed: (key, props) => {
      const previous = indentateEntry(`${getPrefix('-')}${key}: ${stringify(props.prevValue)}`, nestingLevel);
      const actual = indentateEntry(`${getPrefix('+')}${key}: ${stringify(props.value)}`, nestingLevel);

      return [previous, actual];
    },

    nestedComparison: (key, props) => {
      const value = render(props.children, nestingLevel + 1);

      return `${getIndent(nestingLevel)}${key}: ${value}`;
    },
  };

  const makeDiffEntry = (key) => {
    const propsObject = tree[key];
    const handler = handlers[propsObject.state];

    return handler(key, propsObject);
  };

  const entriesArr = keys.reduce((acc, key) => [...acc, makeDiffEntry(key)], []);

  return `{\n${_.flatten(entriesArr).join('')}${getIndent(nestingLevel - 1)}}\n`;
};

export default tree => render(tree, 1);
