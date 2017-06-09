import WidgetBase from '../WidgetBase';

class ButtonModal extends WidgetBase {

  viewType='button'

  constructor() {
    super();
    this.isContainer = false;
  }

  initAttrConfig() {
    return {
      text: { value: 'button' },
    };
  }

  // TODO: color, use react-color
  initStyleConfig() {
    return {
      height: { value: 44 },
      lineHeight: { value: 44 },
      minHeight: { value: '' },
      backgroundColor: { value: '#F50', type: 'color' },
      color: { value: '#fff', type: 'color' },
      margin: { value: '0 auto' },
      textAlign: {
        title: '文字对齐',
        value: 'center',
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

export default ButtonModal;
