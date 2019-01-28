import { isObject, has, union } from 'lodash';

const propertyActions = [
  {
    action: (value1, value2, buildAST) => ({ children: buildAST(value1, value2), type: 'samedeep' }),
    check: (key, tree1, tree2) => isObject(tree1[key]) && isObject(tree2[key]),
  },
  {
    action: (value1, value2) => ({ value: value2, type: 'added' }),
    check: (key, tree1, tree2) => has(tree2, key) && !has(tree1, key),
  },
  {
    action: value1 => ({ value: value1, type: 'removed' }),
    check: (key, tree1, tree2) => !has(tree2, key) && has(tree1, key),
  },
  {
    action: value1 => ({ value: value1, type: 'same' }),
    check: (key, tree1, tree2) => tree1[key] === tree2[key],
  },
  {
    action: (value1, value2) => ({ prevValue: value1, nextValue: value2, type: 'updated' }),
    check: (key, tree1, tree2) => has(tree2, key) && has(tree1, key) && tree2[key] !== tree1[key],
  },
];

const buildAST = (tree1, tree2) => {
  const keys = union(Object.keys(tree1), Object.keys(tree2));
  return keys.map((key) => {
    const { action } = propertyActions.find(({ check }) => check(key, tree1, tree2));
    return { key, ...action(tree1[key], tree2[key], buildAST) };
  });
};

export default buildAST;
