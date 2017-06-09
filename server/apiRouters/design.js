const path = require('path');
const fsExists = require('fs-exists-sync');
const fsExtra = require('fs-extra');
const glob = require('glob');

const designFilesDirPath = path.join(__dirname, '..designFiles');

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
      return res.status(404).json({
        code: 40400,
        message: 'designId not exist',
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
      return path.relative(designFilesDirPath, fName).replace('/design.json');
    });
    return res.json({
      designIds,
    });
  });

  apiApp.get('/designs/:designId', (req, res) => {
    const designId = res.params.designId;
    const fileName = path.join(designFilesDirPath, designId, 'design.json');
    if (!fsExists(fileName)) {
      return res.status(404).json({
        code: 40400,
        message: 'designId not exist',
      });
    }
    fsExtra.readJson(fileName)
      .then(obj => {
        res.json(obj);
      })
      .catch(err => {
        // can res.json(err)?
        res.status(500).json(err);
      });
  });
};
