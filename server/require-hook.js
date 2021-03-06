/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import fs from 'fs';
import sass from 'node-sass';
import processStyleText from './utils/processStyleText';

const originJsExtension = require.extensions['.js'];

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

function outputFileContent(fileName) {
  return fs.readFileSync(fileName).toString();
}


// m means module
require.extensions['.js'] = (m, filename) => {
  const devScriptFilenameReg = /[a-zA-Z0-9_-]+\.entry-script\.js$/;
  if (devScriptFilenameReg.test(filename)) {
    // const content = outputFileContent(filename); // TODO: rollup compile
    // const fsContent = fs.readFileSync(filename).toString();
    // if (process.env.NODE_ENV !== 'production') {
    //   delete require.cache[filename];
    // }
    return m._compile('module.exports = ' + JSON.stringify(filename), filename);
  }
  return originJsExtension(m, filename);
};

function hook(compile, extension) {
  require.extensions[extension] = (m, filename) => {
    const tokens = compile(filename);
    // if (process.env.NODE_ENV !== 'production') {
    //   delete require.cache[filename];
    // }
    delete require.cache[filename];
    return m._compile('module.exports = ' + JSON.stringify(tokens), filename);
  };
}

hook(compileSass, '.scss');
hook(outputFileContent, '.css');
hook(empty, '.yml');
