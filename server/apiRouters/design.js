import fs from 'fs';
import njk from 'nunjucks';
import buildHtml from '../core/buildHtml';

const path = require('path');
const fsExists = require('fs-exists-sync');
const fsExtra = require('fs-extra');
const glob = require('glob');
const compileScript = require('../core/compileScript');

const designFilesDirPath = path.join(__dirname, '../designFiles');

// function compileScript(entries) {
//   return rollup.rollup({
//     entry: entries,
//     external: ['jQuery'],
//     plugins: [
//       // memory(),
//       multiEntry(),
//       resolve(),
//       commonjs(),
//     ],
//   }).then((bundle) => {
//     return bundle.generate({
//       format: 'iife',
//       useStrict: false,
//       moduleName: 'NO_MEANING',
//       globals: {
//         jQuery: 'jQuery',
//       },
//     }).code;
//   });
// }

module.exports = (apiApp) => {
  apiApp.post('/designs', (req, res) => {
    const data = req.body;
    const designId = data.designId;
    if (!designId) {
      return res.status(400).json({
        code: 40001,
        message: 'designId is required',
      });
    }
    const fileName = path.join(designFilesDirPath, designId, 'design.json');
    if (fsExists(fileName) && !data.force) {
      return res.status(400).json({
        code: 40002,
        message: `designId:${designId} has been existed, use force if you sure to override!`,
      });
    }
    fsExtra
      .outputJson(fileName, data)
      .then(() => {
        res.json({
          message: 'ok',
        });
      }).catch((err) => {
        res.status(500).json(err);
      });
  });

  apiApp.get('/designs', (req, res) => {
    const fileList = glob.sync(path.join(designFilesDirPath, '**/design.json'));
    const designIds = fileList.map(fName => {
      return path.relative(designFilesDirPath, fName).replace('/design.json', '');
    });
    return res.json({
      designIds,
    });
  });

  apiApp.get('/designs/:designId', (req, res) => {
    const designId = req.params.designId;
    const fileName = path.join(designFilesDirPath, designId, 'design.json');
    const jsFile = path.join(designFilesDirPath, designId, 'index.entry-script.js');
    const cssFile = path.join(designFilesDirPath, designId, 'index.scss');
    let cssContent = '';
    /* eslint-disable import/no-dynamic-require */

    if (fsExists(cssFile)) {
      cssContent = require(cssFile);
    }

    if (!fsExists(fileName)) {
      return res.status(404).json({
        code: 40400,
        message: 'designId not exist',
      });
    }
    const obj = fsExtra.readJsonSync(fileName);
    if (fsExists(jsFile)) {
      return compileScript([jsFile]).then()
        .then(jsCode => {
          res.json({
            json: obj,
            js: jsCode,
            css: cssContent,
          });
        })
        .catch(err => {
          // can res.json(err)?
          res.status(500).json(err);
        });
    }
    return res.json({
      json: obj,
      css: cssContent,
      js: '',
    });
  });

  const commonNjkTpl = fs.readFileSync(path.join(__dirname, '../template.njk')).toString();


  apiApp.post('/designs/:designId/build', (req, res) => {
    const designId = req.params.designId;
    const workDir = path.join(__dirname, `../designFiles/${designId}`);
    const designJsonPath = path.join(workDir, 'design.json');
    if (!fsExists(designJsonPath)) {
      return res.status(404).json({
        code: 40400,
        message: 'designId not exist',
      });
    }
    const dataJson = fsExtra.readJsonSync(path.join(workDir, 'design.json'));
    let njkTpl = commonNjkTpl;
    const ownNjkTplPath = path.join(workDir, 'template.njk');
    if (fsExists(ownNjkTplPath)) {
      njkTpl = fs.readFileSync(ownNjkTplPath).toString();
    }

    const jsFile = path.join(workDir, 'index.entry-script.js');
    let cssContent = '';
    const cssFilePath = path.join(workDir, 'index.scss');
    if (fsExists()) {
      cssContent = require(cssFilePath);
    }
    buildHtml(dataJson)
      .then(result => {
        const scriptFiles = result.scriptFiles;
        compileScript([...scriptFiles, jsFile]).then(code => {
          const html = njk.renderString(njkTpl, {
            htmlContent: `
              <style>${result.style.default}</style>
              <style>${result.style.inline}</style>
              <style>${cssContent}</style>
              ${result.html.main}
            `,
            scriptText: code,
            title: `${designId}`,
          });
          fsExtra.outputFileSync(path.join(workDir, 'design.html'), html);
          res.json({
            message: 'ok',
          });
        });
      })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
  });
};
