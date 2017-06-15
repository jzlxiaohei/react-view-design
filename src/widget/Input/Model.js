import WidgetBase from '../WidgetBase';

class Input extends WidgetBase {

  constructor() {
    super();
    this.isContainer = false;
  }

  initAttrConfig() {
    return {
      placeholder: { title: '占位文字(无输入时显示)' },
      type: {
        value: 'text',
        options: [
          { value: 'text', title: '文本' },
          { value: 'password', title: '密码' },
        ],
      },
    };
  }

  initStyleConfig() {
    return {
      width: { value: '' },
      minHeight: { value: '' },
      fontSize: { value: 12 },
    };
  }

}

export default Input;
