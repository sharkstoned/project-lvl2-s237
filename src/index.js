import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import makeDiff from './makeDiff';

const makeConfig = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');

  const parse = getParser(path.extname(filePath));

  return parse(data);
};

const genDiff = (path1, path2) => {
  const config1 = makeConfig(path1);
  const config2 = makeConfig(path2);

  return makeDiff(config1, config2);
};

export default genDiff;
