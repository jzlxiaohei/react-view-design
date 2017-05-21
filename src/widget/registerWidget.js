import registerTable from 'globals/registerTable';
import { ModelContainer, CompContainer } from './Container';
import { ModelPicture, CompPicture } from './Picture';

function register() {
  if (module.hot) {
    registerTable.clearTable();
  }
  registerTable.register('container', ModelContainer, CompContainer, { title: '容器' });
  registerTable.register('picture', ModelPicture, CompPicture, { title: '图片' });
}

register();
