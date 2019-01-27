import { isObject } from 'lodash';

const stringify = (content, depth) => {
  if (!isObject(content)) {
    return content;
  }
  const preident = ' '.repeat(depth * 4 + 2);
  const postident = ' '.repeat(depth * 4);
  const result = Object.keys(content).map(key => (`${preident}  ${key}: ${content[key]}`));
  return `{\n${result.join('\n')}\n${postident}}`;
};

const render = (abstract, depth = 0) => {
  const preident = ' '.repeat(depth * 4 + 2);
  const postident = ' '.repeat(depth * 4);
  const result = abstract.map((element) => {
    const { key, value, type } = element;
    switch (type) {
      case 'samedeep':
        return (`${preident}  ${key}: ${render(element.children, depth + 1)}`);
      case 'updated':
        return [
          `${preident}+ ${key}: ${stringify(element.nextValue, depth + 1)}`,
          `${preident}- ${key}: ${stringify(element.prevValue, depth + 1)}`,
        ].join('\n');
      case 'added':
        return `${preident}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'removed':
        return `${preident}- ${key}: ${stringify(value, depth + 1)}`;
      case 'same':
        return `${preident}  ${key}: ${stringify(value, depth + 1)}`;
      default:
    }
    return null;
  });
  return `{\n${result.join('\n')}\n${postident}}`;
};

export default render;
