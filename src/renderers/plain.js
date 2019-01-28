const giveNames = (parentKey, children) => children.map(element => ({ ...element, key: `${parentKey}.${element.key}` }));

const stringify = value => (value instanceof Object ? 'complex value' : value);

const plainRender = (content) => {
  const result = content.map((element) => {
    const { key, value, type } = element;
    switch (type) {
      case 'samedeep':
        return plainRender(giveNames(key, element.children));
      case 'same':
        return null;
      case 'added':
        return `Property ${key} was added with value: ${stringify(value)}`;
      case 'removed':
        return `Property ${key} was removed`;
      case 'updated':
        return `Property ${key} was updated. From ${stringify(element.prevValue)} to ${stringify(element.nextValue)}`;
      default:
        throw new Error(`Unknown type ${type}`);
    }
  });
  return result.filter(n => n).join('\n');
};

export default plainRender;
