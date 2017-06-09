import registerTable from 'globals/registerTable';
import { ModelContainer, CompContainer } from './Container';
import { ModelPicture, CompPicture } from './Picture';
import { ModelText, CompText } from './Text';
import { ModelSwipe, CompSwipe } from './Swipe';
import { ModelModal, CompModal } from './Modal';
import { ModelButton, CompButton } from './Button';
import { ModelForm, CompForm,
  FormInputContainer,
  FormInputItemWrapper,
  FormLabel,
  FormInput,
  ShowFormInputContainer,
  ShowInputWrapper,
  ShowLabel,
  ShowInput,
} from './Form';


function register() {
  if (module.hot) {
    registerTable.clearTable();
  }
  registerTable.register('container', ModelContainer, CompContainer, { title: '容器' });
  registerTable.register('picture', ModelPicture, CompPicture, { title: '图片' });
  registerTable.register('text', ModelText, CompText, { title: '文本' });
  registerTable.register('swipe', ModelSwipe, CompSwipe, { title: '轮播组件' });
  registerTable.register('modal', ModelModal, CompModal, { title: '弹窗', notAllowAdded: true });
  registerTable.register('form', ModelForm, CompForm, { title: '表单' });
  registerTable.register('button', ModelButton, CompButton, { title: '按钮' });


  // local 意味着由parent 负责相关的构建以及show,edit
  // 这里register 为了获得全局唯一id
  // 有点丑，先这样
  registerTable.register('local-form-input-container', FormInputContainer, ShowFormInputContainer, { notAllowAdded: true });
  registerTable.register('local-form-input-wrapper', FormInputItemWrapper, ShowInputWrapper, { notAllowAdded: true });
  registerTable.register('local-form-label', FormLabel, ShowLabel, { notAllowAdded: true });
  registerTable.register('local-form-input', FormInput, ShowInput, { notAllowAdded: true });
}

register();
