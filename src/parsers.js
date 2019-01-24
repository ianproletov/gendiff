import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

const getParseMethod = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (filepath) => {
  const filepathAbs = path.resolve(process.cwd(), filepath);
  const fileExt = path.extname(filepathAbs);
  const fileContent = fs.readFileSync(filepathAbs, 'utf-8');
  return getParseMethod[fileExt](fileContent);
};

export default parse;
