import plusmnRender from './plusmnrender';
import plainRender from './plain';
import jsonRender from './jsonrender';

export default (rendertype) => {
  switch (rendertype) {
    case 'plain':
      return plainRender;
    case 'json':
      return jsonRender;
    default:
      return plusmnRender;
  }
};
