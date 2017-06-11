const _ = require('lodash');
const postcss = require('postcss');
const postcssJs = require('postcss-js');
const autoprefixer = require('autoprefixer');
const Promise = require('bluebird');
const styleUtils = require('../../src/utils/processStyle');
// const bluebird = require('bluebird');

class StyleProcessor {
  styleInfo = []
  idInfo = [];
  // promiseList = [];

  processStyle = (style, model) => {
    const id = model.getDomId();
    if (_.includes(this.idInfo, id)) {
      throw new Error(`duplicated id: ${id}`);
    }
    // postcss([autoprefixer]).process(style, { parser: postcssJs }).then((result) => {
    //   console.log(result.css);
    // });
    const styleWithRem = styleUtils.px2rem(styleUtils.appendPx(style));
    const cssPromise = postcss([autoprefixer]).process(styleWithRem, { parser: postcssJs });
    this.idInfo.push(id);
    this.styleInfo.push(cssPromise);
    return {};
  }

  getStyleText = () => {
    if (this.styleInfo.length == 0) {
      return Promise.resolve([]);
    }
    return Promise.all(this.styleInfo).then((styleTextList) => {
      return styleTextList.map((styleText, index) => {
        return `
#${this.idInfo[index]} {
  ${styleText}
}
        `;
      });
    });
  }
}

export default StyleProcessor;
