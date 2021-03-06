import WidgetBase from '../WidgetBase';

class Picture extends WidgetBase {

  // static isContainer = false;

  constructor() {
    super();
    this.isContainer = false;
  }

  initAttrConfig() {
    return {
      url: { title: '图片链接', value: '//cdn.llscdn.com/fe-static/lls-acts/tx-B5Oc6SnV.jpg' },
      link: { title: '跳转链接' },
    };
  }

  initStyleConfig() {
    return {
      width: { value: 375 },
      height: { value: 375 },
      // display: { value: 'inline-block' },
    };
  }

  adjustImgSize(size) {
    const { width, height } = size;
    if (!width || !height) {
      throw new Error('pic size({width, height}) should not be empty');
    }
    const originWidth = this.style.width;
    const ratio = height / width;
    this.assignStyle({
      height: originWidth * ratio,
    });
  }
}

export default Picture;
