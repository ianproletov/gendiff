const giveNames = (parentKey, children) => children.map(element => ({ ...element, key: `${parentKey}.${element.key}` }));

const stringify = value => (value instanceof Object ? 'complex value' : value);

const plainRender = (abstract) => {
  const result = abstract.map((element) => {
    const { key, value, type } = element;
    if (type === 'samedeep') {
      return plainRender(giveNames(key, element.children));
    }
    if (type === 'same') {
      return null;
    }
    if (type === 'added') {
      return `Property ${key} was added with value: ${stringify(value)}`;
    }
    if (type === 'removed') {
      return `Property ${key} was removed`;
    }
    return `Property ${key} was updated. From ${stringify(element.prevValue)} to ${stringify(element.nextValue)}`;
  });
  return result.filter(n => n).join('\n');
};

export default plainRender;
