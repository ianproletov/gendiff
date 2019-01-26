import { has, union, isObject } from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';
import render from './renderers/defrender';

const getContent = (filepath) => {
  const pathabs = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(pathabs, 'utf-8');
};

const genDiff = (filepath1, filepath2, method = render) => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);
  const firstFileAST = parse(getContent(filepath1), extension1);
  const secondFileAST = parse(getContent(filepath2), extension2);
  const iter = (firstAST, secondAST) => {
    const keys = union(Object.keys(firstAST), Object.keys(secondAST));
    return keys.reduce((acc, key) => {
      if (has(firstAST, key) && has(secondAST, key)) {
        if (firstAST[key] === secondAST[key]) {
          return [...acc, { key, value: firstAST[key], type: 'same' }];
        }
        if ((isObject(firstAST[key]) && isObject(secondAST[key]))) {
          return [...acc, { key, children: iter(firstAST[key], secondAST[key]), type: 'samedeep' }];
        }
        const element1 = { key, value: secondAST[key], type: 'added' };
        const element2 = { key, value: firstAST[key], type: 'removed' };
        return [...acc, element1, element2];
      }
      if (has(secondAST, key)) {
        return [...acc, { key, value: secondAST[key], type: 'added' }];
      }
      return [...acc, { key, value: firstAST[key], type: 'removed' }];
    }, []);
  };
  return method(iter(firstFileAST, secondFileAST));
};

export default genDiff;
