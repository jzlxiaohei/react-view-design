const rollup = require('rollup');
// const memory = require('rollup-plugin-memory');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const multiEntry =  require('rollup-plugin-multi-entry');

function compileScript(entries) {
  return rollup.rollup({
    entry: entries,
    external: ['jQuery'],
    plugins: [
      // memory(),
      multiEntry(),
      resolve(),
      commonjs(),
    ],
  }).then((bundle) => {
    return bundle.generate({
      format: 'iife',
      useStrict: false,
      moduleName: 'NO_MEANING',
      globals: {
        jQuery: 'jQuery',
      },
    }).code;
  });
}

module.exports = compileScript;
