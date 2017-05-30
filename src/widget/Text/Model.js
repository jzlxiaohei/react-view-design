import WidgetBase from '../WidgetBase';


class Text extends WidgetBase {

  constructor() {
    super();
    this.isContainer = false;
  }

  initAttrConfig() {
    return {
      content: { value: ['text'] },
    };
  }

  initStyleConfig() {
    return {
      width: { value: 375 },
      height: { value: 375 },
      textAlign: {
        title: '文字对齐',
        options: [
          { value: 'center', text: '居中对齐' },
          { value: 'left', text: '' },
          { value: 'right', text: '' },
        ],
      },
      fontSize: { value: 16 },
    };
  }

}

export default Text;
