import { has, union, isObject } from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers';
import defaultRender from './renderers';

const getContent = (filepath) => {
  const pathabs = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(pathabs, 'utf-8');
};

const genDiff = (filepath1, filepath2, method = defaultRender) => {
  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);
  const firstFileTree = parse(getContent(filepath1), extension1);
  const secondFileTree = parse(getContent(filepath2), extension2);
  const iter = (firstTree, secondTree) => {
    const keys = union(Object.keys(firstTree), Object.keys(secondTree));
    return keys.reduce((acc, key) => {
      if (has(firstTree, key) && has(secondTree, key)) {
        if (firstTree[key] === secondTree[key]) {
          return [...acc, { key, value: firstTree[key], type: 'same' }];
        }
        if ((isObject(firstTree[key]) && isObject(secondTree[key]))) {
          return [...acc, { key, children: iter(firstTree[key], secondTree[key]), type: 'samedeep' }];
        }
        return [...acc, {
          key,
          prevValue: firstTree[key],
          nextValue: secondTree[key],
          type: 'updated',
        }];
      }
      if (has(secondTree, key)) {
        return [...acc, { key, value: secondTree[key], type: 'added' }];
      }
      return [...acc, { key, value: firstTree[key], type: 'removed' }];
    }, []);
  };
  return method(iter(firstFileTree, secondFileTree));
};

export default genDiff;
