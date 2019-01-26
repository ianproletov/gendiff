const stringify = (content, deepSize) => {
  if (content instanceof Object) {
    const preident = ' '.repeat(deepSize * 4 + 2);
    const postident = ' '.repeat(deepSize * 4);
    const result = Object.keys(content).map(key => (`${preident}  ${key}: ${content[key]}`));
    return `{\n${result.join('\n')}\n${postident}}`;
  }
  return content;
};

const render = (abstract, deepSize = 0) => {
  const preident = ' '.repeat(deepSize * 4 + 2);
  const postident = ' '.repeat(deepSize * 4);
  const result = abstract.map((element) => {
    const { key, value, type } = element;
    switch (type) {
      case 'samedeep':
        return (`${preident}  ${key}: ${render(element.children, deepSize + 1)}`);
      case 'updated':
        return [
          `${preident}+ ${key}: ${stringify(element.nextValue, deepSize + 1)}`,
          `${preident}- ${key}: ${stringify(element.prevValue, deepSize + 1)}`,
        ].join('\n');
      case 'added':
        return `${preident}+ ${key}: ${stringify(value, deepSize + 1)}`;
      case 'removed':
        return `${preident}- ${key}: ${stringify(value, deepSize + 1)}`;
      case 'same':
        return `${preident}  ${key}: ${stringify(value, deepSize + 1)}`;
      default:
        break;
    }
    return null;
  });
  return `{\n${result.join('\n')}\n${postident}}`;
};

export default render;
