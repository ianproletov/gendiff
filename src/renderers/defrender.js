const chartype = {
  same: ' ',
  samedeep: ' ',
  added: '+',
  removed: '-',
};

const stringify = (content, deepSize) => {
  const preident = ' '.repeat(deepSize * 4 + 2);
  const postident = ' '.repeat(deepSize * 4);
  const result = Object.keys(content).map(key => (`${preident}  ${key}: ${content[key]}`));
  return `{\n${result.join('\n')}\n${postident}}`;
};

const render = (abstract, deepSize = 0) => {
  const currentValue = value => (value instanceof Object ? stringify(value, deepSize + 1) : value);
  const preident = ' '.repeat(deepSize * 4 + 2);
  const postident = ' '.repeat(deepSize * 4);
  const result = abstract.map((element) => {
    const { key, value, type } = element;
    if (type === 'samedeep') {
      return `${preident}${chartype[type]} ${key}: ${render(element.children, deepSize + 1)}`;
    }
    if (type === 'updated') {
      const added = `${preident}${chartype.added} ${key}: ${currentValue(element.nextValue)}`;
      const removed = `${preident}${chartype.removed} ${key}: ${currentValue(element.prevValue)}`;
      return [added, removed].join('\n');
    }
    return `${preident}${chartype[type]} ${key}: ${currentValue(value)}`;
  });
  return `{\n${result.join('\n')}\n${postident}}`;
};

export default render;
