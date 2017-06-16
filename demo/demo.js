import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import njk from 'nunjucks';
import buildHtml from '../server/core/buildHtml';
import compileScript from '../server/core/compileScript';

const workDir = path.join(__dirname, '../server/designFiles/demo-form');

const dataJson = fsExtra.readJsonSync(path.join(workDir, 'design.json'));
const njkTpl = fs.readFileSync(path.join(__dirname, '../server/template.njk')).toString();
const jsFile = path.join(workDir, 'index.entry-script.js');
const cssContent = require(path.join(workDir, 'index.scss'));

buildHtml(dataJson)
  .then(result => {
    const scriptFiles = result.scriptFiles;
    console.log(scriptFiles);
    compileScript([...scriptFiles, jsFile]).then(code => {
      const html = njk.renderString(njkTpl, {
        htmlContent: `
          <style>${result.style.default}</style>
          <style>${result.style.inline}</style>
          <style>${cssContent}</style>
          ${result.html.main}
        `,
        scriptText: code,
        title: 'demo-form',
      });
      fsExtra.outputFileSync(path.join(workDir, 'design.html'), html);
    });
  })
  .catch(err => { console.error(err); });
