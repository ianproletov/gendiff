import { has, union } from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';

const chartype = {
  same: ' ',
  added: '+',
  removed: '-',
};

const hasChildren = parent => parent instanceof Object;

export const render = (abstract) => {
  const result = abstract.map(({
    key,
    value,
    type,
    deepSize,
  }) => {
    const ident = ' '.repeat(deepSize * 4 - 2);
    const currentValue = (value instanceof Array ? render(value) : value);
    return `${ident}${chartype[type]} ${key}: ${currentValue}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

const getContent = (filepath) => {
  const pathabs = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(pathabs, 'utf-8');
};

const genDiff = (filepath1, filepath2) => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);
  const firstFileAST = parse(getContent(filepath1), extension1);
  const secondFileAST = parse(getContent(filepath2), extension2);
  const iter = (firstAST, secondAST, deepSize) => {
    const sendValue = cont => (hasChildren(cont) ? iter(cont, cont, deepSize + 1) : cont);
    const keys = union(Object.keys(firstAST), Object.keys(secondAST));
    const result = keys.reduce((acc, key) => {
      const preresult = { key, deepSize };
      if (has(firstAST, key) && has(secondAST, key)) {
        if (firstAST[key] === secondAST[key]) {
          return [...acc, { ...preresult, value: firstAST[key], type: 'same' }];
        }
        if ((hasChildren(firstAST[key]) && hasChildren(secondAST[key]))) {
          return [...acc, { ...preresult, value: iter(firstAST[key], secondAST[key], deepSize + 1), type: 'same' }];
        }
        const element1 = { ...preresult, value: sendValue(secondAST[key]), type: 'added' };
        const element2 = { ...preresult, value: sendValue(firstAST[key]), type: 'removed' };
        return [...acc, element1, element2];
      }
      if (has(secondAST, key)) {
        return [...acc, { ...preresult, value: sendValue(secondAST[key]), type: 'added' }];
      }
      return [...acc, { ...preresult, value: sendValue(firstAST[key]), type: 'removed' }];
    }, []);
    return result;
  };
  const firstLayDeepSize = 1;
  return render(iter(firstFileAST, secondFileAST, firstLayDeepSize));
};

export default genDiff;
