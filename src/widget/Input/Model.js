import WidgetBase from '../WidgetBase';

class Input extends WidgetBase {

  constructor() {
    super();
    this.isContainer = false;
  }

  initAttrConfig() {
    return {
      placeholder: { title: '占位文字(无输入时显示)' },
    };
  }

  initStyleConfig() {
    return {
      width: { value: '' },
      minHeight: { value: '' },
    };
  }

}

export default Input;
