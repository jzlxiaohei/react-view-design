import WidgetBase from '../WidgetBase';

class Container extends WidgetBase {

  constructor() {
    super();
    this.assignStyle({
      position: 'relative',
    });
  }

  initAttrConfig() {
    return {};
  }
}

export default Container;
