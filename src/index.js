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
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export const render = (abstract) => {
  const result = Object.keys(abstract).map(key => dispetcher[abstract[key].status](abstract[key])).join('\n');
  return `{\n ${result}\n}`;
};

const makePathAbsolute = pathOfFile => path.resolve(process.cwd(), pathOfFile);

const genDiff = (firstFilePath, secondFilePath) => {
  const FirstFilePathAbs = makePathAbsolute(firstFilePath);
  const SecondFilePathAbs = makePathAbsolute(secondFilePath);
  const typeOfFirstFile = path.extname(FirstFilePathAbs);
  const typeOfSecondFile = path.extname(SecondFilePathAbs);
  const firstFile = fs.readFileSync(FirstFilePathAbs);
  const secondFile = fs.readFileSync(SecondFilePathAbs);
  const firstAST = multiParser[typeOfFirstFile](firstFile);
  const secondAST = multiParser[typeOfSecondFile](secondFile);
  const abstract = parser(firstAST, secondAST);
  return render(abstract);
};

export default genDiff;
