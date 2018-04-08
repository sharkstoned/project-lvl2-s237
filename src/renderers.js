import renderTree from './render/tree';
import renderPlain from './render/plain';

const renderers = {
  tree: renderTree,
  plain: renderPlain,
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
