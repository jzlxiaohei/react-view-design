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
  ShowFormInputContainer,
  ShowInputWrapper,
  ShowLabel,
} from './Form';
import { ModelInput, CompInput } from './Input';
import { ModelRadio, CompRadio } from './Radio';
import { ModelCheckbox, CompCheckbox } from './Checkbox';
import { ModelLink, CompLink } from './Link';

function register() {
  if (module.hot) {
    registerTable.clearTable();
  }
  registerTable.register('container', ModelContainer, CompContainer, { title: '容器' });
  registerTable.register('picture', ModelPicture, CompPicture, { title: '图片' });
  registerTable.register('text', ModelText, CompText, { title: '文本' });
  registerTable.register('link', ModelLink, CompLink, { title: '超链接' });
  registerTable.register('form', ModelForm, CompForm, { title: '表单' });
  registerTable.register('button', ModelButton, CompButton, { title: '按钮' });
  registerTable.register('input', ModelInput, CompInput, { title: '单行输入框' });
  registerTable.register('radio', ModelRadio, CompRadio, { title: '单选框' });
  registerTable.register('checkbox', ModelCheckbox, CompCheckbox, { title: '多选框' });
  registerTable.register('swipe', ModelSwipe, CompSwipe, { title: '轮播组件' });
  registerTable.register('modal', ModelModal, CompModal, { title: '弹窗', notAllowAdded: true });

  registerTable.register('local-form-item-container', FormInputContainer, ShowFormInputContainer, { notAllowAdded: true });
  registerTable.register('local-form-item-wrapper', FormInputItemWrapper, ShowInputWrapper, { notAllowAdded: true });
  registerTable.register('local-form-label', FormLabel, ShowLabel, { notAllowAdded: true });
  // registerTable.register('local-form-input', FormInput, ShowInput, { notAllowAdded: true });
}

export default register;
// register();
