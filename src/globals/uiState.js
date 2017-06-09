import { observable, action } from 'mobx';
// import ls from 'local-storage';

// const navFoldedKey = 'cmcc-nav-folded';

const UiState = {
  @observable isLockScreen: false, // 全屏loading
  @observable isAjaxLoading: false, // 头部右上角的loading

  @observable errMsg: '',

  @action setErrMsg(msg, time) {
    this.errMsg = msg;
    setTimeout(this.clearErrMsg, time || 10 * 1000);
  },

  @action clearErrMsg() {
    UiState.errMsg = '';
  },

  @action
  lockScreen() {
    this.isLockScreen = true;
  },

  @action
  unLockScreen() {
    this.isLockScreen = false;
  },

  @action
  showAjaxLoading() {
    this.isAjaxLoading = true;
  },

  @action
  hideAjaxLoading() {
    this.isAjaxLoading = false;
  },



};

export default UiState;
