const chartype = {
  same: ' ',
  samedeep: ' ',
  added: '+',
  removed: '-',
};

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
    if (type === 'samedeep') {
      return `${preident}${chartype[type]} ${key}: ${render(element.children, deepSize + 1)}`;
    }
    if (type === 'updated') {
      const added = `${preident}${chartype.added} ${key}: ${stringify(element.nextValue, deepSize + 1)}`;
      const removed = `${preident}${chartype.removed} ${key}: ${stringify(element.prevValue, deepSize + 1)}`;
      return [added, removed].join('\n');
    }
    return `${preident}${chartype[type]} ${key}: ${stringify(value, deepSize + 1)}`;
  });
  return `{\n${result.join('\n')}\n${postident}}`;
};

export default render;
