import registerTable from 'globals/registerTable';
import { extendObservable, action } from 'mobx';
import ajax from 'utils/ajax';
import { addReq } from 'infra/model/utils';

// 自在浏览器环境下用
class DesignModel {

  constructor() {
    addReq(this, ajax);
    extendObservable(this, {
      designId: '',
      note: '',
      force: false,
      mainContainer: registerTable.createModelInstance('container', 'main-container'),
      modalListContainer: registerTable.createModelInstance('container', 'modal-list-container'),
    });
  }

  @action
  setDesignId(id) {
    this.designId = id;
    return this;
  }

  fetch() {
    if (!this.designId) {
      return Promise.reject('DesignModel fetch data: designId required');
    }
    return this.$request({
      method: 'get',
      url: `/designs/${this.designId}`,
    }).then((data) => {
      const json = data.json;
      registerTable.initIdGenerator(json.idGenerator);
      this.mainContainer.initByJSON(json.mainContainer);
      this.modalListContainer.initByJSON(json.modalListContainer);
      this.designId = json.designId;
      this.note = json.note;
      const js = data.js;
      const css = data.css;
      this.createScriptAndStyle(js, css);
    });
  }

  createScriptAndStyle(js, css) {
    const styleDom = document.createElement('style');
    styleDom.innerHTML = css;
    styleDom.type = 'text/css';
    document.body.appendChild(styleDom);

    const script = document.createElement('script');
    script.innerHTML = js;
    document.body.appendChild(script);
  }

  post() {
    if (!this.designId) {
      return Promise.reject('DesignModel post data: designId required');
    }
    const data = {
      designId: this.designId,
      note: this.note,
      mainContainer: this.mainContainer.getJSON(),
      modalListContainer: this.modalListContainer.getJSON(),
      idGenerator: registerTable.getIdGenerator(),
      force: this.force,
    };

    return this.$request({
      method: 'post',
      url: '/designs',
      data,
    });
  }

}

export default DesignModel;
