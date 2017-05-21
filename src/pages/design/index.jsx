import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, extendObservable } from 'mobx';
import { Tree } from 'antd';
import _ from 'lodash';
import { ModelContainer } from 'widget/WidgetMainContainer';
import registerTable from 'globals/registerTable';
import 'widget/registerWidget';
import '../../edit-widget/registerWidgetEditor';

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
    extendObservable(this, {
      currentSelectedModel: this.mainContainer,
    });
    this.idSeq = 1;
  }

  createModelInstanceWithId = (viewType, id) => {
    const instance = registerTable.createModelInstance(viewType);
    instance.id = id || `${viewType}-${this.idSeq++}`;
    return instance;
  }

  handleSelectShowComp = action((e, model) => {
    model.setSelected(true);
  });


  renderShowArea(model) {
    const ShowComp = registerTable.getShowComp(model.viewType);
    return <ShowComp model={model} htmlMode="design" />;
    /* return (
      <div className="show-area">
        {
          model.children.map((item, index) => {
            const ShowComp = registerTable.getShowComp(item.viewType);
            return (
              <ShowComp
                key={index} model={item} htmlMode="design"
                onClick={(e) => this.handleSelectShowComp(e, item)}
              />
            );
          })
        }
      </div>
    );*/
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
    if (!EditComp) {
      console.log(11);
      return null; // TODO: defaultEditor
    }
    return (
      <EditComp
        model={model}
        viewTypes={registerTable.getViewTypes()}
        createModelInstanceWithId={this.createModelInstanceWithId}
      />
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
          {this.renderShowArea(this.mainContainer)}
          {this.renderEditArea(this.currentSelectedModel)}
          {this.renderModelTree(this.mainContainer)}
        </div>
      </div>
    );
  }
}

export default DesignPage;
