import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

const parseMethods = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (filepath) => {
  const extension = path.extname(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');
  return parseMethods[extension](content);
};

export default parse;
