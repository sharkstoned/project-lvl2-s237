import yaml from 'js-yaml';
import ini from 'ini';

const parse = (config) => {
  switch (config.ext) {
    case '.json':
      return JSON.parse(config.data);
    case '.yml':
      return yaml.safeLoad(config.data);
    case '.ini':
      return ini.parse(config.data);
    default:
      return JSON.parse(config.data);
  }
};

export default parse;
