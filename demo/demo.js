import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import njk from 'nunjucks';
import buildHtml from '../server/core/buildHtml';


const dataJson = fsExtra.readJsonSync(path.join(__dirname, '../server/designFiles/demo-form/design.json'));
const njkTpl = fs.readFileSync(path.join(__dirname, '../server/template.njk')).toString();

buildHtml(dataJson)
  .then(result => {
    const html = njk.renderString(njkTpl, {
      htmlContent: `
        <style>${result.style.default}</style>
        <style>${result.style.inline}</style>
        ${result.html.main}
      `,
      title: 'demo-form',
    });
    fsExtra.outputFileSync(path.join(__dirname, '../server/designFiles/demo-form/design.html'), html);
  })
  .catch(err => { console.error(err); });
