import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import px2rem from 'postcss-px2rem';

// const css = postcss([autoprefixer]).use(px2rem({ remUnit: 37.5 })).process('.t{line-height: 375px}').css;
// console.log(css);

function processStyleText(styleText) {
  return postcss([autoprefixer]).use(px2rem({ remUnit: 37.5 })).process(styleText).css;
}

export default processStyleText;
