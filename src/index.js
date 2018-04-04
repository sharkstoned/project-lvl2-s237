import fs from 'fs';
import path from 'path';
import parse from './parse';
import findDiff from './findDiff';

const constructConfigs = (...args) => args.map(file => ({
  ext: path.extname(file),
  data: fs.readFileSync(file, 'utf8'),
}));

const genDiff = (path1, path2) => {
  const [conf1, conf2] = constructConfigs(path1, path2);

  return findDiff(parse(conf1), parse(conf2));
};

export default genDiff;
