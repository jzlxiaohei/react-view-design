import registerTable from 'globals/registerTable';
// import EditContainer from './Container';
import EditPicture from './Picture';

function register() {
  if (module.hot) {
    registerTable.clearEditTable();
  }
  // registerTable.registerEdit('container', EditContainer);
  registerTable.registerEdit('picture', EditPicture);
}

register();
