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
};
