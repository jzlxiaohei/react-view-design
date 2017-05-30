import WidgetBase from '../WidgetBase';

// TODO: just a container
class Slide extends WidgetBase {
  initAttrConfig() {
    return {};
  }
}

class Swipe extends WidgetBase {

  createSlide() {
    return new Slide();
  }

  push(child) {
    if (!(child instanceof Slide)) {
      throw new Error('use createSlide(), then pass to push function ');
    }
    super.push(child);
  }

  addSlide() {
    const slide = this.createSlide();
    this.push(slide);
    return slide;
  }
}

export default Swipe;
