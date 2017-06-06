import registerTable from 'globals/registerTable';
import { ModelContainer, CompContainer } from './Container';
import { ModelPicture, CompPicture } from './Picture';
import { ModelText, CompText } from './Text';
import { ModelSwipe, CompSwipe } from './Swipe';
import { ModelModal, CompModal } from './Modal';


function register() {
  if (module.hot) {
    registerTable.clearTable();
  }
  registerTable.register('container', ModelContainer, CompContainer, { title: '容器' });
  registerTable.register('picture', ModelPicture, CompPicture, { title: '图片' });
  registerTable.register('text', ModelText, CompText, { title: '文本' });
  registerTable.register('swipe', ModelSwipe, CompSwipe, { title: '轮播组件' });
  registerTable.register('modal', ModelModal, CompModal, { title: '弹窗', notAllowAdded: true });
}

register();
