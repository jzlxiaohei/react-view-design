import registerTable from 'globals/registerTable';
import { extendObservable } from 'mobx';
import ajax from 'utils/ajax';

class DesignModel {

  constructor() {
    extendObservable(this, {
      designId: '',
      note: '',
      force: false,
      mainContainer: registerTable.createModelInstance('container', 'main-container'),
      modalListContainer: registerTable.createModelInstance('container', 'modal-list-container'),
    });
  }

  fetch() {
    if (!this.designId) {
      return Promise.reject('DesignModel fetch data: designId required');
    }
    ajax({
      method: 'get',
      url: `/designs/${this.designId}`,
    }).then((data) => {
      this.mainContainer.initByPlainData(data.mainContainer);
      this.modalListContainer.initByPlainData(data.modalListContainer);
      this.designId = data.designId;
      this.note = data.note;
    });
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
      force: this.force,
    };

    return ajax({
      method: 'post',
      url: '/designs',
      data,
    });
  }

}

export default DesignModel;
