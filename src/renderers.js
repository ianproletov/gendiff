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
  const preident = ' '.repeat(deepSize * 4 + 2);
  const postident = ' '.repeat(deepSize * 4);
  const result = abstract.map(({
    key,
    value,
    type,
    children,
  }) => {
    if (type === 'samedeep') {
      return `${preident}${chartype[type]} ${key}: ${render(children, deepSize + 1)}`;
    }
    const currentValue = (value instanceof Object ? stringify(value, deepSize + 1) : value);
    return `${preident}${chartype[type]} ${key}: ${currentValue}`;
  });
  return `{\n${result.join('\n')}\n${postident}}`;
};

export default render;
