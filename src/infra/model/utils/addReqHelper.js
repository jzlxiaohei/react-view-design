import { action, extendObservable, runInAction } from 'mobx';

/* eslint-disable no-param-reassign */
const assign$loading = action((model, value) => {
  model.$loading = value;
});

function addReq(model, ajax) {
  if (process.env.NODE_ENV !== 'production') {
    const defaultFieldsAndMethods = [
      '$loading',
      '$error',
      '$request',
    ];
    defaultFieldsAndMethods.forEach((m) => {
      if (m in model) {
        console.warn(`${m} in model will be override!`);
      }
    });
  }

  extendObservable(model, {
    $loading: false,
    $error: null,
  });

  model.$request = function $request(options) {
    assign$loading(model, true);
    return ajax(options)
      .then((data) => {
        assign$loading(model, false);
        return data;
      })
      .catch((error) => {
        runInAction('req error', () => {
          model.$loading = false;
          model.$error = error;
        });
        throw error;
      });
  };
}

export default addReq;
