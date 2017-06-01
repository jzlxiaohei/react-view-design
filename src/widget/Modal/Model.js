import WidgetBase from '../WidgetBase';
import { ModelContainer } from '../Container';

// class Slide extends WidgetBase {
//   initAttrConfig() {
//     return {};
//   }
// }

class Modal extends WidgetBase {

  idSeq = 1;

  notAllowDrag = true;

  constructor() {
    super();
    this.assignStyle({
      display: 'none',
      zIndex: 1000,
      position: 'absolute',
      background: 'RGBA(0,0,0,.5)',
    });
    this.contentWrapper = new ModelContainer();
    this.contentWrapper.viewType = 'container';
    this.contentWrapper.setId(`${this.id}-modal-content`);
    super.push(this.contentWrapper);
  }

  push(child) {
    this.contentWrapper.push(child);
    return child;
  }

  setSelected = (value) => {
    this.contentWrapper.setSelected(value);
  };


  removeByIndex(index) {
    this.contentWrapper.removeBYIndex(index);
  }

  remove(model) {
    this.contentWrapper.remove(model);
  }

  initAttrConfig() {
    return {
      triggerId: { title: '触发组件的ID' },
    };
  }

  initStyleConfig() {
    return {
      height: { value: '' },
    };
  }
}

export default Modal;
