import fs from 'fs';
import { has } from 'lodash';

const genDiff = (firstFile, secondFile) => {
  const firstJSON = JSON.parse(fs.readFileSync(firstFile));
  const secondJSON = JSON.parse(fs.resFileSync(secondFile));
  const keysOfFirst = Object.keys(firstJSON);
  const result = keysOfFirst.reduce((acc, key) => {
    if (has(secondJSON, key)) {
      if (secondJSON[key] === firstJSON[key]) {
        return { ...acc, [key]: firstJSON[key] };
      }
      return { ...acc, [`+ ${key}`]: secondJSON[key], [`- ${key}`]: firstJSON[key] };
    }
    return { ...acc, [`- ${key}`]: firstJSON[key] };
  }, {});
  return result;
};

export default genDiff;
