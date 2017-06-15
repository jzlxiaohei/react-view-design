import WidgetBase from '../WidgetBase';

class Checkbox extends WidgetBase {

  initAttrConfig() {
    return {
      name: { value: '' },
      checked: { value: true, title: '勾选', type: 'checkbox' },
    };
  }

  initStyleConfig() {
    return {
      width: { value: '' },
      minHeight: { value: '' },
    };
  }

}

export default Checkbox;
