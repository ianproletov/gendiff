import { has, union, isEqual } from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';

const chartype = {
  saved: '',
  added: '+',
  removed: '-',
};

export const render = (abstract) => {
  const result = abstract.map(({ key, value, type }) => (`  ${chartype[type]} ${key}: ${value}`)).join('\n');
  return `{\n ${result}\n}`;
};

const getContent = (filepath) => {
  const pathabs = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(pathabs, 'utf-8');
};

const genDiff = (filepath1, filepath2) => {
  const firstAST = parse(getContent(filepath1), path.extname(filepath1));
  const secondAST = parse(getContent(filepath2), path.extname(filepath2));
  const keys = union(Object.keys(firstAST), Object.keys(secondAST));
  const result = keys.reduce((acc, key) => {
    if (isEqual(firstAST[key], secondAST[key])) {
      return [...acc, { key, value: firstAST[key], type: 'saved' }];
    }
    if (has(firstAST, key) && has(secondAST, key)) {
      const element1 = { key, value: secondAST[key], type: 'added' };
      const element2 = { key, value: firstAST[key], type: 'removed' };
      return [...acc, element1, element2];
    }
    if (has(secondAST, key)) {
      return [...acc, { key, value: secondAST[key], type: 'added' }];
    }
    return [...acc, { key, value: firstAST[key], type: 'removed' }];
  }, []);
  return render(result);
};

export default genDiff;
