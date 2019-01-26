import { has, union } from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';

const chartype = {
  same: ' ',
  added: '+',
  removed: '-',
};

const isComplex = parent => parent instanceof Object;

const hasChildren = element => element.children !== undefined;

const stringify = (content, deepSize) => {
  const preident = ' '.repeat(deepSize * 4 - 2);
  const postident = ' '.repeat(deepSize * 4 - 4);
  const result = Object.keys(content).map(key => (`${preident}  ${key}: ${content[key]}`));
  return `{\n${result.join('\n')}\n${postident}}`;
};

const render = ([deepSize, ...abstract]) => {
  const preident = ' '.repeat(deepSize * 4 - 2);
  const postident = ' '.repeat(deepSize * 4 - 4);
  const result = abstract.map((element) => {
    const { key, value, type } = element;
    if (hasChildren(element)) {
      return `${preident}${chartype[type]} ${key}: ${render(element.children)}`;
    }
    const currentValue = (isComplex(value) ? stringify(value, deepSize + 1) : value);
    return `${preident}${chartype[type]} ${key}: ${currentValue}`;
  });
  return `{\n${result.join('\n')}\n${postident}}`;
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
    const keys = union(Object.keys(firstAST), Object.keys(secondAST));
    const result = keys.reduce((acc, key) => {
      const preresult = { key, deepSize };
      if (has(firstAST, key) && has(secondAST, key)) {
        if (firstAST[key] === secondAST[key]) {
          return [...acc, { ...preresult, value: firstAST[key], type: 'same' }];
        }
        if ((isComplex(firstAST[key]) && isComplex(secondAST[key]))) {
          return [...acc, { ...preresult, children: iter(firstAST[key], secondAST[key], deepSize + 1), type: 'same' }];
        }
        const element1 = { ...preresult, value: secondAST[key], type: 'added' };
        const element2 = { ...preresult, value: firstAST[key], type: 'removed' };
        return [...acc, element1, element2];
      }
      if (has(secondAST, key)) {
        return [...acc, { ...preresult, value: secondAST[key], type: 'added' }];
      }
      return [...acc, { ...preresult, value: firstAST[key], type: 'removed' }];
    }, []);
    return [deepSize, ...result];
  };
  const firstLayDeepSize = 1;
  return render(iter(firstFileAST, secondFileAST, firstLayDeepSize));
};

export default genDiff;
