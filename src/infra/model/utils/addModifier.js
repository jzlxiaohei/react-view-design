import { action } from 'mobx';
import set from 'lodash/set';
import assign from 'lodash/assign';
import merge from 'lodash/merge';

function addModifier(model) {
  if (process.env.NODE_ENV !== 'production') {
    const defaultMethods = [
      '$assign',
      '$merge',
      '$set',
    ];
    defaultMethods.forEach((m) => {
      if (m in model) {
        console.warn(`${m} in model will be override!`);
      }
    });
  }

  /* eslint-disable no-param-reassign */
  model.$set = action((fieldPath, value) => {
    set(model, fieldPath, value);
  });
  model.$assign = action((data) => {
    assign(model, data);
  });
  model.$merge = action((data) => {
    merge(model, data);
  });
}

export default addModifier;
