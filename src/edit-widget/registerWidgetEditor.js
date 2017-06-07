import registerTable from 'globals/registerTable';
import EditText from './Text';
import EditPicture from './Picture';
import EditSwipe from './Swipe';
import EditForm from './Form';

function register() {
  if (module.hot) {
    registerTable.clearEditTable();
  }
  // registerTable.registerEdit('container', EditContainer);
  registerTable.registerEdit('picture', EditPicture);
  registerTable.registerEdit('text', EditText);
  registerTable.registerEdit('swipe', EditSwipe);
  registerTable.registerEdit('form', EditForm);
  // registerTable.registerEdit('modal', EditModal);
}

register();
