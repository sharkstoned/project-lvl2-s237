import renderTree from './tree';
import renderPlain from './plain';
import renderJson from './json';

const renderers = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

const getRenderer = (format) => {
  const render = renderers[format];
  if (!render) {
    console.warn('Unknown output format given. Processing as a tree.');
    return renderers.tree;
  }

  return render;
};

export default getRenderer;
