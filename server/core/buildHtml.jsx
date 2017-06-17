import _ from 'lodash';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import registerTable from '../../src/globals/registerTable';
import registerWidget from '../../src/widget/registerWidget';
import processTextStyle from '../utils/processStyleText';
import StyleProcessor from '../utils/StyleProcessor';


registerWidget();

function getScriptFilesAnsCssText(root) {
  const viewType = root.viewType;
  const ShowComp = registerTable.getShowComp(viewType);
  const scriptFile = ShowComp.scriptFile;
  const styleText = ShowComp.styleText;
  let script = {};
  let style = {};
  if (scriptFile) {
    script[viewType] = scriptFile;
  }
  if (styleText) {
    style[viewType] = styleText;
  }

  root.children.forEach(child => {
    const assets = getScriptFilesAnsCssText(child);
    script = _.assign({}, script, assets.script);
    style = _.assign({}, style, assets.style);
  });

  return {
    script,
    style,
  };
}

async function buildHtml(json) {
  const mainContainer = registerTable.createModelInstance('container', 'main-container');
  const modalListContainer = registerTable.createModelInstance('container', 'modal-list-container');
  mainContainer.initByJSON(json.mainContainer);
  modalListContainer.initByJSON(json.modalListContainer);
  const ShowComp = registerTable.getShowComp('container');
  const styleProcessor = new StyleProcessor();
  // const mainContainerStyleText = getDefaultStyle(mainContainer);
  // const modalListContainerStyleText = getDefaultStyle(modalListContainer);
  // const finalDefaultStyleTextList = _.values(
  //   _.assign({}, mainContainerStyleText, modalListContainerStyleText),
  //   value => processTextStyle(value),
  // );

  const mainAssets = getScriptFilesAnsCssText(mainContainer);
  const modalAssets = getScriptFilesAnsCssText(modalListContainer);


  const finalDefaultStyleObj = _.assign({}, mainAssets.style, modalAssets.style);
  const finalDefaultStyleTextList = _.values(finalDefaultStyleObj).map(value => processTextStyle(value));

  const scriptFileObj = _.assign({}, mainAssets.script, modalAssets.script);

  const mainReactHtml = ReactDOMServer.renderToStaticMarkup(
    <ShowComp model={mainContainer} processStyle={styleProcessor.processStyle} />,
  );
  const ModalReactHtml = modalListContainer.children.length > 0 ? ReactDOMServer.renderToStaticMarkup(
    <ShowComp model={modalListContainer} processStyle={styleProcessor.processStyle} />,
  ) : '';

  const inlineStyleTextList = await styleProcessor.getStyleText();

  return {
    scriptFiles: _.values(scriptFileObj), // 还有和当前 design.json 所在目录的 index.entry-script.js concat 一下
    style: {
      default: finalDefaultStyleTextList.join(''),
      inline: inlineStyleTextList.join(''),
    },
    html: {
      main: mainReactHtml,
      modal: ModalReactHtml,
    },
  };
}

export default buildHtml;
