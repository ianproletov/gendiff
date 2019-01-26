const stringify = (content) => {
  if (content instanceof Object) {
    const result = Object.keys(content).map(key => (`"${key}":"${content[key]}"`));
    return `{${result.join(',')}}`;
  }
  return `"${content}"`;
};

const jsonRender = (abstract) => {
  const result = abstract.map((element) => {
    const { key, value, type } = element;
    switch (type) {
      case 'samedeep':
        return (`"${key}":${jsonRender(element.children)}`);
      case 'updated':
        return `"${key}":{"newValue":${stringify(element.nextValue)},"oldvalue":${stringify(element.prevValue)},"type":"${type}"}`;
      case 'added':
        return `"${key}":{"value":${stringify(value)},"type":"${type}"}`;
      case 'removed':
        return `"${key}":{"value":${stringify(value)},"type":"${type}"}`;
      case 'same':
        return `"${key}":{"value":${stringify(value)},"type":"${type}"}`;
      default:
    }
    return null;
  });
  return `{${result.join(',')}}`;
};

export default jsonRender;
