import path from 'path';
import fs from 'fs';
import parse from './parsers';
import render from './renderers';
import buildAST from './buildAST';

const getContent = (filepath) => {
  const pathabs = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(pathabs, 'utf-8');
};

const genDiff = (filepath1, filepath2, rendertype) => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);
  const firstFileTree = parse(getContent(filepath1), extension1);
  const secondFileTree = parse(getContent(filepath2), extension2);
  return render(rendertype)(buildAST(firstFileTree, secondFileTree));
};

export default genDiff;
