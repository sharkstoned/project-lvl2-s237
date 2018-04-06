import _ from 'lodash';

const makeIndent = (levelMultiplier, sign = ' ') => {
  const basicLength = 4;

  if (levelMultiplier === 0) {
    return '';
  }

  return `${' '.repeat((basicLength * levelMultiplier) - 2)}${sign} `;
};

const render = (tree, nestingLevel = 1) => {
  const keys = _.keys(tree);

  const stringify = (valueToCheck, innerNestingLevel = nestingLevel) => {
    if (!_.isPlainObject(valueToCheck)) {
      return valueToCheck;
    }

    const objValue = valueToCheck;
    const prewrapped = _.keys(objValue)
      .reduce((acc, key) => `${acc}${makeIndent(innerNestingLevel + 1)}${key}: ${stringify(objValue[key], innerNestingLevel + 1)}\n`, '');

    return `{\n${prewrapped}${makeIndent(innerNestingLevel)}}`;
  };

  const handlers = {
    added: (key, props) => `${makeIndent(nestingLevel, '+')}${key}: ${stringify(props.value)}\n`,
    removed: (key, props) => `${makeIndent(nestingLevel, '-')}${key}: ${stringify(props.value)}\n`,
    remains: (key, props) => `${makeIndent(nestingLevel)}${key}: ${stringify(props.value)}\n`,
    changed: (key, props) => `${makeIndent(nestingLevel, '-')}${key}: ${stringify(props.prevValue)}\n${makeIndent(nestingLevel, '+')}${key}: ${stringify(props.value)}\n`,
    nestedComparison: (key, props) => {
      const value = render(props.children, nestingLevel + 1);

      return `${makeIndent(nestingLevel)}${key}: ${value}`;
    },
  };

  const makeDiffEntry = (key) => {
    const propsObject = tree[key];
    const handler = handlers[propsObject.state];

    return handler(key, propsObject);
  };

  const prewrapped = keys.reduce((acc, key) => `${acc}${makeDiffEntry(key)}`, '');

  return `{\n${prewrapped}${makeIndent(nestingLevel - 1)}}\n`;
};

export default render;
