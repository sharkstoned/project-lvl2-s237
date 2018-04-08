import _ from 'lodash';

const stringify = (val) => {
  if (!_.isPlainObject(val)) {
    return `value '${val}'`;
  }

  return 'complex value';
};

const render = (ast, parentProperty) => {
  const keys = _.keys(ast);

  const getFullProperty = key => `${parentProperty}${key}`;

  const handlers = {
    added: (key, props) => `Property '${getFullProperty(key)}' was added with ${stringify(props.value)}\n`,
    removed: key => `Property '${getFullProperty(key)}' was removed\n`,
    remains: () => '',
    changed: (key, props) => `Property '${getFullProperty(key)}' was updated with ${stringify(props.newValue)}\n`,
    nestedComparison: (key, props) => render(props.children, `${parentProperty}${key}.`),
  };

  const makeDiffEntry = (key) => {
    const propsObject = ast[key];
    const handler = handlers[propsObject.type];

    return handler(key, propsObject);
  };

  const entriesArr = keys.reduce((acc, key) => [...acc, makeDiffEntry(key)], []);

  return _.flatten(entriesArr).join('');
};

export default ast => render(ast, '');
