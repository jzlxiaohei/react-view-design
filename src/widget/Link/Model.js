import WidgetBase from '../WidgetBase';

class Link extends WidgetBase {

  initAttrConfig() {
    return {
      link: { title: '跳转链接' },
    };
  }

  initStyleConfig() {
    return {
      width: { value: '' },
    };
  }

}

export default Link;
