import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildAst from './buildAst';

const makeConfig = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');

  const parse = getParser(path.extname(filePath));

  return parse(data);
};

const genDiff = (path1, path2) => {
  const config1 = makeConfig(path1);
  const config2 = makeConfig(path2);

  console.log(buildAst(config1, config2));
  // return buildAst(config1, config2);
};

export default genDiff;
