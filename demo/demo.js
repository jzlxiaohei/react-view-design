import path from 'path';
import fsExtra from 'fs-extra';
import buildHtml from '../server/core/buildHtml';

const dataJson = fsExtra.readJsonSync(path.join(__dirname, '../server/designFiles/demo-form/design.json'));

buildHtml(dataJson)
  .then(result => console.log(result))
  .catch(err => { console.error(err); });
