import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildAst from './buildAst';
import render from './render';

const getConfig = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');

  const parse = getParser(path.extname(filePath));

  return parse(data);
};

const genDiff = (path1, path2) => {
  const config1 = getConfig(path1);
  const config2 = getConfig(path2);

  const ast = buildAst(config1, config2);
  return render(ast);
};

export default genDiff;
