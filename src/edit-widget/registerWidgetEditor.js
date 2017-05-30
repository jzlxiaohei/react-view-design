import registerTable from 'globals/registerTable';
import EditText from './Text';
import EditPicture from './Picture';

function register() {
  if (module.hot) {
    registerTable.clearEditTable();
  }
  // registerTable.registerEdit('container', EditContainer);
  registerTable.registerEdit('picture', EditPicture);
  registerTable.registerEdit('text', EditText);
}

register();
