import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parser from './parsers';

const dispetcher = {
  equal: key => `   ${key.keyName}: ${key.value}`,
  different: key => `  + ${key.keyName}: ${key.valueOfSecond}\n  - ${key.keyName}: ${key.valueOfFirst}`,
  second: key => `  + ${key.keyName}: ${key.value}`,
  first: key => `  - ${key.keyName}: ${key.value}`,
};

const multiParser = {
  '.json': (first, second) => parser(JSON.parse(first), JSON.parse(second)),
  '.yml': (first, second) => parser(yaml.safeLoad(first), yaml.safeLoad(second)),
};

export const render = (abstract) => {
  const result = Object.keys(abstract).map(key => dispetcher[abstract[key].status](abstract[key])).join('\n');
  return `{\n ${result}\n}`;
};

const makePathAbsolute = pathOfFile => path.resolve(process.cwd(), pathOfFile);

const genDiff = (firstFilePath, secondFilePath) => {
  const firstFile = fs.readFileSync(makePathAbsolute(firstFilePath));
  const secondFile = fs.readFileSync(makePathAbsolute(secondFilePath));
  const typeOfFile = path.extname(makePathAbsolute(firstFilePath));
  const abstract = multiParser[typeOfFile](firstFile, secondFile);
  return render(abstract);
};

export default genDiff;
