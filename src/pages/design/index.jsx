import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, extendObservable } from 'mobx';
import { Tree, Tag } from 'antd';
import _ from 'lodash';
import ConfirmDelete from 'comps/common/ConfirmDelete';
import { ModelContainer } from 'widget/WidgetMainContainer';
import registerTable from 'globals/registerTable';
import 'widget/registerWidget';
import DefaultEditWidget from 'editWidget/DefaultEditWidget';
import 'editWidget/registerWidgetEditor';
import './index.scss';

const TreeNode = Tree.TreeNode;

@observer
class DesignPage extends React.Component {


  static propTypes = {
    mainContainer: PropTypes.instanceOf(ModelContainer),
  }

  constructor(props) {
    super(props);
    this.mainContainer = this.createModelInstanceWithId('container', 'main-container');
    this.mainContainer.setSelected(true);
    this.mainContainer.assignStyle({ height: '' });
    extendObservable(this, {
      currentSelectedModel: this.mainContainer,
    });
    this.idSeq = 1;
    this.initMockModel();
  }

  initMockModel() {
    this.mainContainer.push(this.createModelInstanceWithId('picture'));
    this.mainContainer.push(this.createModelInstanceWithId('text'));
    const swipeModel = this.mainContainer.push(this.createModelInstanceWithId('swipe'));
    swipeModel.addSlide();
    swipeModel.addSlide().assignStyle({ background: 'yellow' });
    swipeModel.addSlide().assignStyle({ background: 'green' });
  }

  createModelInstanceWithId = (viewType, id) => {
    const instance = registerTable.createModelInstance(viewType);
    instance.id = id || `${viewType}-${this.idSeq++}`;
    return instance;
  }

  handleSelectShowComp = action((e, model) => {
    model.setSelected(true);
  });

  handelRemoveModel = action((model) => {
    if (model.parentContainer) {
      model.parentContainer.remove(model);
      this.currentSelectedModel = model.parentContainer;
    }
  })

  renderShowArea(model) {
    /* eslint-disable no-param-reassign*/
    const ShowComp = registerTable.getShowComp(model.viewType);
    return <ShowComp model={model} htmlMode="design" />;
  }

  handleViewTypeClick = (viewType) => {
    const instance = this.createModelInstanceWithId(viewType);
    // const ShowComp = registerTable.getShowComp(model.viewType);
    this.mainContainer.push(instance);
  }

  renderEditArea(model) {
    // find selected model
    const viewType = model.viewType;
    const EditComp = registerTable.getEditComp(viewType);
    const props = {
      onRemove: this.handelRemoveModel,
      model,
      viewTypesConfig: registerTable.getShowTable(),
      createModelInstanceWithId: this.createModelInstanceWithId,
    };
    if (!EditComp) {
      return <DefaultEditWidget {...props} />;
    }
    return (
      <EditComp {...props} />
    );
  }

  renderTreeNodeTitle(model) {
    return (
      <span>
        {model.id}
        <ConfirmDelete onConfirm={() => this.handelDeleteModel(model)} />
      </span>
    );
  }

  buildTreeDom(model) {
    return (
      <TreeNode title={model.id} key={model.id} isLeaf={!model.isContainer}>
        {model.children.map(m => this.buildTreeDom(m))}
      </TreeNode>
    );
  }

  findModelById(id, model) {
    if (!model) return null;
    if (model.id === id) {
      return model;
    }
    let selectedModel = null;
    _.forEach(model.children, (childModel) => {
      const selectChild = this.findModelById(id, childModel);
      if (selectChild) {
        selectedModel = selectChild;
        return false;
      }
    });
    return selectedModel;
  }

  handleSelectTreeNode = action((selectedKeys) => {
    const selectedId = selectedKeys[0];
    if (!selectedId) return;
    const selectedModel = this.findModelById(selectedId, this.mainContainer);
    if (selectedModel) {
      this.currentSelectedModel.setSelected(false);
      selectedModel.setSelected(true);
      this.currentSelectedModel = selectedModel;
    }
  })

  renderModelTree(model) {
    return (
      <Tree
        autoExpandParent
        expandedKeys={[this.currentSelectedModel.id]}
        showLine
        onSelect={this.handleSelectTreeNode}
      >
        {this.buildTreeDom(model)}
      </Tree>
    );
  }

  render() {
    return (
      <div className="design-page">
        <div className="flex-container">
          <div className="model-tree-area">
            <Tag color="blue">对象树</Tag>
            {this.renderModelTree(this.mainContainer)}
          </div>
          <div className="phone-simulator-375">
            {this.renderShowArea(this.mainContainer)}
          </div>
          <div className="model-edit-area">
            {this.renderEditArea(this.currentSelectedModel)}
          </div>
        </div>
      </div>
    );
  }
}

export default DesignPage;
