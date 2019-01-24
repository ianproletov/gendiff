import fs from 'fs';
import { has, union } from 'lodash';
import path from 'path';

const dispetcher = {
  equal: key => `   ${key.keyName}: ${key.value}`,
  different: key => `  + ${key.keyName}: ${key.valueOfSecond}\n  - ${key.keyName}: ${key.valueOfFirst}`,
  second: key => `  + ${key.keyName}: ${key.value}`,
  first: key => `  - ${key.keyName}: ${key.value}`,
};

export const render = (abstract) => {
  const result = Object.keys(abstract).map(key => dispetcher[abstract[key].status](abstract[key])).join('\n');
  return `{\n ${result}\n}`;
};

const makePathAbsolute = pathOfFile => path.resolve(process.cwd(), pathOfFile);

const genDiff = (firstFile, secondFile) => {
  const firstJSON = JSON.parse(fs.readFileSync(makePathAbsolute(firstFile)));
  const secondJSON = JSON.parse(fs.readFileSync(makePathAbsolute(secondFile)));
  const keysOfFirst = Object.keys(firstJSON);
  const keysOfSecond = Object.keys(secondJSON);
  const keysOfBoth = union(keysOfFirst, keysOfSecond);
  const result = keysOfBoth.reduce((acc, key) => {
    if (has(secondJSON, key) && has(firstJSON, key)) {
      if (secondJSON[key] === firstJSON[key]) {
        return { ...acc, [key]: { keyName: key, value: firstJSON[key], status: 'equal' } };
      }
      const newElement = {
        keyName: key,
        valueOfSecond: secondJSON[key],
        valueOfFirst: firstJSON[key],
        status: 'different',
      };
      return { ...acc, [key]: newElement };
    }
    if (has(secondJSON, key)) {
      return { ...acc, [key]: { keyName: key, value: secondJSON[key], status: 'second' } };
    }
    return { ...acc, [key]: { keyName: key, value: firstJSON[key], status: 'first' } };
  }, {});
  return render(result);
};

export default genDiff;
