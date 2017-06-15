import { extendObservable, action } from 'mobx';
import { addReq } from 'infra/model/utils';
import ajax from 'utils/ajax';

class DesignList {
  constructor() {
    addReq(this, ajax);
    extendObservable(this, {
      list: [],
    });
  }

  @action
  setList(list) {
    this.list = list;
  }

  fetch() {
    this.$request({
      url: '/designs',
      method: 'get',
    }).then((data) => {
      this.setList(data.designIds);
    });
  }

}

export default DesignList;
