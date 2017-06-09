/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const fs = require('fs');
const sass = require('node-sass');
const processStyleText = require('./utils/processStyleText');

const originJsExtension = require.extensions['.js'];

// m means module
require.extensions['.js'] = (m, filename) => {
  const devScriptFilenameReg = /[a-zA-Z0-9_-]+\.tpl-script\.js$/;
  if (devScriptFilenameReg.test(filename)) {
    // const fsContent = fs.readFileSync(filename).toString();
    if (process.env.NODE_ENV !== 'production') {
      delete require.cache[filename];
    }
    return m._compile('module.exports = ' + JSON.stringify(filename), filename);
  }
  return originJsExtension(m, filename);
};

function hook(compile, extension) {
  require.extensions[extension] = (m, filename) => {
    const tokens = compile(filename);
    return m._compile('module.exports = ' + JSON.stringify(tokens), filename);
  };
}

function compileSass(filename) {
  const sassContent = sass.renderSync({
    file: filename,
    includePaths: [path.join(__dirname, '../src')],
  });
  return processStyleText(sassContent.css.toString());
}

function empty() {
  return '';
}

// function outputFileContent(fileName) {
//   return fs.readFileSync(fileName).toString();
// }

hook(compileSass, '.scss');
// hook(outputFileContent, '.css');
hook(empty, '.yml');
