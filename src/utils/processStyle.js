/* eslint-disable quote-props, key-spacing */
import _ from 'lodash';


// list below comes from https://github.com/postcss/postcss-js/blob/master/parser.js

const unitless = {
  'box-flex':          true,
  'box-flex-group':    true,
  'column-count':      true,
  'flex':              true,
  'flex-grow':         true,
  'flex-positive':     true,
  'flex-shrink':       true,
  'flex-negative':     true,
  'font-weight':       true,
  'line-clamp':        true,
  // 'line-height':       true,
  'opacity':           true,
  'order':             true,
  'orphans':           true,
  'tab-size':          true,
  'widows':            true,
  'z-index':           true,
  'zoom':              true,
  'fill-opacity':      true,
  'stroke-dashoffset': true,
  'stroke-opacity':    true,
  'stroke-width':      true,
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function dashify(str) {
  return str.replace(/([A-Z])/g, '-$1')
            .replace(/^ms-/, '-ms-')
            .toLowerCase();
}

function appendPx(style) {
  const styleWithPx = {};
  _.forOwn(style, (originValue, key) => {
    const dashedName = dashify(key);
    let value = originValue;
    if (typeof value === 'number' || isNumeric(value)) {
      if (value === 0 || unitless[dashedName]) {
        value = value.toString();
      } else {
        value += 'px';
      }
    }
    styleWithPx[key] = value;
  });
  return styleWithPx;
}

// TODO: 375 => params
function convertPx2Rem(value, key) {
  if (_.includes(key, 'border') && !_.includes(key, 'radius')) {
    return value;
  }
  if (_.endsWith(value, 'px')) {
    const num = parseFloat(value);
    if (!_.isNumber(num)) {
      return console.warn(`px2rem: ${value}: not a number follow by 'px' `);
    }
    const remNum = (num * 10) / 375;
    if (remNum !== 0) {
      return remNum.toFixed(2) + 'rem';
    }
    return 0;
  }
  return value;
}

// 要考虑诸如 value 是 10px 0 20px 30px 这样的情况
function processPx2Rem(value, key) {
  const remStrList = value
    .split(/\s+/)
    .filter(v => v !== '')
    .map(n => convertPx2Rem(n, key));
  return remStrList.join(' ');
}

function px2rem(style, ignoreFields = []) {
  const neededStyle = _.omit(style, ignoreFields);
  const remStyle = _.mapValues(neededStyle, (value, key) => {
    return processPx2Rem(value, key);
  });
  return remStyle;
}


export { px2rem };
export { appendPx };

// import postcssJs from 'postcss-js';
// import autoprefixer from 'autoprefixer';
// const prefixer = postcssJs.sync([autoprefixer]);

// function addPrefix(style) {
//   return prefixer(style);
// }
// export { addPrefix };
