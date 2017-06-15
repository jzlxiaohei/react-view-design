import registerTable from 'globals/registerTable';
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
    return {
      play: { title: '开启动画', value: false, type: 'checkbox' },
      playTime: { title: 'slide间隔时间', value: 2000 },
    };
  }

  createSlide() {
    const slide = registerTable.createModelInstance('container');
    slide.assignStyle({
      // background: 'red',
      position: '',
      width: '100%',
    });
    slide.notAllowDrag = true;
    slide.notAllowWrap = true;
    return slide;
  }

  push(child) {
    if (child instanceof ModelContainer && child.notAllowDrag) {
      return super.push(child);
    }
    throw new Error('use createSlide(), then pass to push function ');
  }

  addSlide() {
    const slide = this.createSlide();
    super.push(slide);
    return slide;
  }
}

export default Swipe;
