import _ from 'lodash';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import registerTable from '../../src/globals/registerTable';
import registerWidget from '../../src/widget/registerWidget';
import processTextStyle from '../utils/processStyleText';
import StyleProcessor from '../utils/StyleProcessor';


registerWidget();

function getDefaultStyle(rootModel) {
  const styleTextMap = {};
  const viewType = rootModel.viewType;
  const style = registerTable.getShowComp(viewType).styleText;
  if (style) {
    styleTextMap[viewType] = style;
  }
  rootModel.children.forEach(child => {
    const childStyleTextMap = getDefaultStyle(child);
    _.assign(styleTextMap, childStyleTextMap);
  });

  return styleTextMap;
}

async function buildHtml(json) {
  const mainContainer = registerTable.createModelInstance('container', 'main-container');
  const modalListContainer = registerTable.createModelInstance('container', 'modal-list-container');
  mainContainer.initByJSON(json.mainContainer);
  modalListContainer.initByJSON(json.modalListContainer);
  const ShowComp = registerTable.getShowComp('container');
  const styleProcessor = new StyleProcessor();
  const mainContainerStyleText = getDefaultStyle(mainContainer);
  const modalListContainerStyleText = getDefaultStyle(modalListContainer);
  const finalDefaultStyleTextList = _.values(
    _.assign({}, mainContainerStyleText, modalListContainerStyleText),
    value => processTextStyle(value),
  );

  const mainReactHtml = ReactDOMServer.renderToStaticMarkup(
    <ShowComp model={mainContainer} processStyle={styleProcessor.processStyle} />,
  );
  const ModalReactHtml = modalListContainer.children.length > 0 ? ReactDOMServer.renderToStaticMarkup(
    <ShowComp model={modalListContainer} processStyle={styleProcessor.processStyle} />,
  ) : '';

  const inlineStyleTextList = await styleProcessor.getStyleText();

  return {
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
