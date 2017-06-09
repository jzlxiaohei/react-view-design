const path = require('path');
const glob = require('glob');
const _ = require('lodash');

/* eslint-disable import/no-dynamic-require */
const excludeFile = path.join(__dirname, 'index.js');

const allFiles = glob.sync(path.join(__dirname, '**/*.js'));

function initRouter(apiApp) {
  _.filter(allFiles, filename => filename !== excludeFile)
  .forEach(file => require(file)(apiApp));
}

module.exports = initRouter;
