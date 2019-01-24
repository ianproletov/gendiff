import { has, union, isEqual } from 'lodash';
import parse from './parsers';

const chartype = {
  equal: '',
  second: '+',
  first: '-',
};

export const render = (abstract) => {
  const result = abstract.map(({ key, value, type }) => (`  ${chartype[type]} ${key}: ${value}`)).join('\n');
  return `{\n ${result}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const firstAST = parse(filepath1);
  const secondAST = parse(filepath2);
  const keys = union(Object.keys(firstAST), Object.keys(secondAST));
  const result = keys.reduce((acc, key) => {
    if (isEqual(firstAST[key], secondAST[key])) {
      return [...acc, { key, value: firstAST[key], type: 'equal' }];
    }
    if (has(firstAST, key) && has(secondAST, key)) {
      const element1 = { key, value: secondAST[key], type: 'second' };
      const element2 = { key, value: firstAST[key], type: 'first' };
      return [...acc, element1, element2];
    }
    if (has(secondAST, key)) {
      return [...acc, { key, value: secondAST[key], type: 'second' }];
    }
    return [...acc, { key, value: firstAST[key], type: 'first' }];
  }, []);
  return render(result);
};

export default genDiff;
