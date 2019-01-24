import { has, union, isEqual } from 'lodash';

const parser = (firstAST, secondAST) => {
  const keysOfFirst = Object.keys(firstAST);
  const keysOfSecond = Object.keys(secondAST);
  const keysOfBoth = union(keysOfFirst, keysOfSecond);
  const result = keysOfBoth.reduce((acc, key) => {
    if (isEqual(firstAST[key], secondAST[key])) {
      return { ...acc, [key]: { keyName: key, value: firstAST[key], status: 'equal' } };
    }
    if (has(firstAST, key) && has(secondAST, key)) {
      const newElement = {
        keyName: key,
        valueOfSecond: secondAST[key],
        valueOfFirst: firstAST[key],
        status: 'different',
      };
      return { ...acc, [key]: newElement };
    }
    if (has(secondAST, key)) {
      return { ...acc, [key]: { keyName: key, value: secondAST[key], status: 'second' } };
    }
    return { ...acc, [key]: { keyName: key, value: firstAST[key], status: 'first' } };
  }, {});
  return result;
};

export default parser;
