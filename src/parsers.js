import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParser = ext => (data) => {
  const parse = parsers[ext];
  if (!parse) {
    throw new Error(`unkown format: ${ext}`);
  }

  return parse(data);
};

export default getParser;
