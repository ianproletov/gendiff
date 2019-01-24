import { has, union } from 'lodash';

const parser = (firstAST, secondAST) => {
  const keysOfFirst = Object.keys(firstAST);
  const keysOfSecond = Object.keys(secondAST);
  const keysOfBoth = union(keysOfFirst, keysOfSecond);
  const result = keysOfBoth.reduce((acc, key) => {
    if (has(firstAST, key) && has(secondAST, key)) {
      if (secondAST[key] === firstAST[key]) {
        return { ...acc, [key]: { keyName: key, value: firstAST[key], status: 'equal' } };
      }
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
