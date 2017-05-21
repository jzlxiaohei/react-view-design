import _ from 'lodash';

function getDataCustomAttr(attr) {
  const result = {};
  _.forOwn(attr, (value, key) => {
    if (_.includes(key, 'data-')) {
      result[key] = value;
    }
  });
  return result;
}

export default getDataCustomAttr;
