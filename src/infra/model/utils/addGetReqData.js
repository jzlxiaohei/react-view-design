import forOwn from 'lodash/forOwn';
import isFunction from 'lodash/isFunction';

function falsy() {
  return false;
}

function addGetReqData(model, excludedFn = falsy) {
  /* eslint-disable no-param-reassign */
  model.getReqData = function getReqData() {
    const reqData = {};
    forOwn(model, (value, key) => {
      if (isFunction(value)) return;
      if (excludedFn(key, value, model)) return;
      reqData[key] = value;
    });
    return reqData;
  };
}

function buildGetReqData(excludedFn) {
  return (model) => {
    addGetReqData(model, excludedFn);
  };
}

export { buildGetReqData };
export default addGetReqData;
