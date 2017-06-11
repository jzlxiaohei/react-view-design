import WidgetBase from '../WidgetBase';
// import { ModelContainer } from '../Container';
import registerTable from 'globals/registerTable';

// class Slide extends WidgetBase {
//   initAttrConfig() {
//     return {};
//   }
// }

class Modal extends WidgetBase {


  notAllowDrag = true;

  constructor() {
    super();
    this.assignStyle({
      display: 'none',
    });
    this.contentWrapper = registerTable.createModelInstance('container');
    super.push(this.contentWrapper);
  }

  push() {
    throw new Error('Modal has only only one container as child, do not call push method');
  }

  // push(child) {
  //   this.contentWrapper.push(child);
  //   return child;
  // }

  // setSelected = (value) => {
  //   this.contentWrapper.setSelected(value);
  // };


  // removeByIndex(index) {
  //   this.contentWrapper.removeBYIndex(index);
  // }

  // remove(model) {
  //   this.contentWrapper.remove(model);
  // }


  initAttrConfig() {
    return {
      triggerId: { title: '触发组件的ID' },
    };
  }

  initStyleConfig() {
    return {
      display: { ignoreEdit: true },
      background: { title: '遮罩背景' },
      position: { value: 'fixed', ignoreEdit: true },
      height: { ignoreEdit: true, value: '' },
      minHeight: { ignoreEdit: true, value: '' },
      color: { ignoreEdit: true },
    };
  }
}

export default Modal;
