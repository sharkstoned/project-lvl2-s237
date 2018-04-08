import _ from 'lodash';

const stringify = (val) => {
  if (!_.isPlainObject(val)) {
    return `value '${val}'`;
  }

  return 'complex value';
};

const render = (tree, parentProperty) => {
  const keys = _.keys(tree);

  const getFullProperty = key => `${parentProperty}${key}`;

  const handlers = {
    added: (key, props) => `Property '${getFullProperty(key)}' was added with ${stringify(props.value)}\n`,
    removed: key => `Property '${getFullProperty(key)}' was removed\n`,
    remains: () => '',
    changed: (key, props) => `Property '${getFullProperty(key)}' was updated with ${stringify(props.value)}\n`,
    nestedComparison: (key, props) => render(props.children, `${parentProperty}${key}.`),
  };

  const makeDiffEntry = (key) => {
    const propsObject = tree[key];
    const handler = handlers[propsObject.state];

    return handler(key, propsObject);
  };

  const entriesArr = keys.reduce((acc, key) => [...acc, makeDiffEntry(key)], []);

  return _.flatten(entriesArr).join('');
};

export default tree => render(tree, '');
