import WidgetBase from '../WidgetBase';

class Radio extends WidgetBase {

  constructor() {
    super();
    this.isContainer = false;
  }

  initAttrConfig() {
    return {
      name: { value: '' },
    };
  }

  initStyleConfig() {
    return {
      width: { value: '' },
      minHeight: { value: '' },
    };
  }

}

export default Radio;
