import axios from 'axios';
import _ from 'lodash';
import uiState from 'globals/uiState';
import config from 'config';
// import walkObjectKeys from './walkObjectKeys';

const axiosInstance = axios.create({});

const methods = [
  'get', 'post', 'put', 'delete',
];

const ajax = (options) => {
  const method = options.method.toLowerCase();
  return ajax[method](_.omit(options, [options.method]));
};


/* eslint-disable no-param-reassign */
methods.forEach((method) => {
  ajax[method] = (options) => {
    options.method = method || 'get';

    if (method === 'get') {
      options.params = options.data;
    }
    options.url = _.template(options.url)(options.urlParams || {});
    if (options.useApiBase !== false) {
      options.url = config.apiBase + options.url;
    }
    setTimeout(() => {
      uiState.showAjaxLoading();
    }, 10);
    return axiosInstance.request(options)
      .then((res) => {
        uiState.hideAjaxLoading();
        // const data = walkObjectKeys(res.data, camelFn(options.reservedKeys));
        return res.data;
      }).catch((errRes) => {
        uiState.hideAjaxLoading();
        const err = errRes.response || {};
        if (err.status === 401) {
          uiState.setErrMsg('权限问题，如果你确认自己有权限,请刷新重试或重新登录');
        } else if (err.data && err.data.message) {
          uiState.setErrMsg(err.data.message);
        } else {
          uiState.setErrMsg(`${options.method} ${options.url} : request error.`);
        }
        throw err;
      });
  };
});


export default ajax;
