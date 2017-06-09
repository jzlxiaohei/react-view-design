const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');

// const css = postcss([autoprefixer]).use(px2rem({ remUnit: 37.5 })).process('.t{line-height: 375px}').css;
// console.log(css);

function processStyleText(styleText) {
  return postcss([autoprefixer]).use(px2rem({ remUnit: 37.5 })).process(styleText).css;
}

module.exports = processStyleText;
