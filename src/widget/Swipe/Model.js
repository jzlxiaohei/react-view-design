import WidgetBase from '../WidgetBase';
import { ModelContainer } from '../Container';

// class Slide extends WidgetBase {
//   initAttrConfig() {
//     return {};
//   }
// }

class Swipe extends WidgetBase {

  idSeq = 1;

  initAttrConfig() {
    return {};
  }

  createSlide() {
    const slide = new ModelContainer();
    slide.setId(`${this.id}-slide-${this.idSeq++}`);
    slide.viewType = 'container';
    slide.assignStyle({
      background: 'red',
    });
    return slide;
  }

  push(child) {
    if (!(child instanceof ModelContainer)) {
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
