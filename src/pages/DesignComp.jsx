import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, extendObservable } from 'mobx';
import { Tree, Tag, message, Button, Tabs } from 'antd';
import _ from 'lodash';
import registerTable from 'globals/registerTable';
import DefaultEditWidget from 'editWidget/DefaultEditWidget';

import registerWidget from 'widget/registerWidget';
import registerEditWidget from 'editWidget/registerWidgetEditor';
import DesignModel from './DesignModel';
import BackEndForm from './_BackEndForm';
import './design-comp.scss';

registerWidget();
registerEditWidget();

const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;

@observer
class DesignComp extends React.Component {


  static propTypes = {
    // mainContainer: PropTypes.instanceOf(ModelContainer).isRequired,
    // modalListContainer: PropTypes.instanceOf(ModelContainer).isRequired,
    initMockModel: PropTypes.func,
    designModel: PropTypes.instanceOf(DesignModel).isRequired,
  }

  constructor(props) {
    super(props);
    this.designModel = this.props.designModel || new DesignModel();
    this.mainContainer = this.designModel.mainContainer;
    this.mainContainer.setSelected(true);
    this.mainContainer.notAllowDrag = true;
    this.modalListContainer = this.designModel.modalListContainer;
    extendObservable(this, {
      currentSelectedModel: this.mainContainer,
    });
    this.selectedKeysPool = {};
    // window.mainContainer = this.mainContainer;
    // window.modalListContainer = this.modalListContainer;
    if (this.props.initMockModel) {
      this.props.initMockModel(this.mainContainer, this.modalListContainer, this.createModelInstanceWithId);
    }
  }


  createModelInstanceWithId = (viewType, id) => {
    const instance = registerTable.createModelInstance(viewType, id);
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
    return (
      <ShowComp
        model={model} htmlMode="design" currentSelectedModel={this.currentSelectedModel}
        setCurrentSelectedModel={this.setCurrentSelectedModel}
      />)
    ;
  }

  handleViewTypeClick = (viewType) => {
    const instance = this.createModelInstanceWithId(viewType);
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
      selectedModel: this.currentSelectedModel,
    };
    if (!EditComp) {
      return <DefaultEditWidget {...props} />;
    }
    return (
      <EditComp {...props} />
    );
  }

  buildTreeDom(model) {
    return (
      <TreeNode mobxModel={model} title={model.id} key={model.id} isLeaf={!model.isContainer}>
        {
          model.children.length > 0 ?
            model.children.map(m => this.buildTreeDom(m))
            : null
        }
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

  handleSelectTreeNode = action((selectedKeys, rootModel) => {
    const selectedId = selectedKeys[0];
    if (!selectedId) return;
    const selectedModel = this.findModelById(selectedId, rootModel);
    this.selectedKeysPool[rootModel.id] = selectedKeys;
    if (selectedModel) {
      this.currentSelectedModel.setSelected(false);
      selectedModel.setSelected(true);
      this.currentSelectedModel = selectedModel;
      this.forceUpdate();
    } else {
      console.warn(`can not find ${selectedId} from ${rootModel}`);
    }
  })


  setCurrentSelectedModel = action((selectedModel) => {
    this.currentSelectedModel.setSelected(false);
    selectedModel.setSelected(true);
    this.currentSelectedModel = selectedModel;
  })


  handleModelTreeDrop = action((info) => {
    // console.log(info);
    const dropModel = info.node.props.mobxModel;
    const dragModel = info.dragNode.props.mobxModel;
    if (dragModel == this.mainContainer || _.find(this.modalListContainer.children, dragModel)) {
      return;
    }
    // push 是有可能发生error，比如swipe的push
    // remove from container 不会。
    try {
      if (dropModel.isContainer) {
        const oldParent = dragModel.parentContainer;
        dropModel.push(dragModel);
        oldParent.remove(dragModel);
        return;
      }
      const oldParent = dragModel.parentContainer;
      const parentContainer = dropModel.parentContainer;
      parentContainer.insertBefore(dragModel, dropModel);
      if (parentContainer !== oldParent) {
        oldParent.remove(dragModel);
      }
    } catch (e) {
      message.error(`拖拽失败：${e.message}`);
      console.error(e);
    }
  })

  renderModelTree(model, key) {
    let selectedKeys;
    if (model === this.currentSelectedModel) {
      selectedKeys = this.selectedKeysPool[model.id] || [];
    } else {
      selectedKeys = [];
    }
    return (
      <Tree
        key={key}
        defaultExpandAll
        autoExpandParent
        showLine
        selectedKeys={selectedKeys}
        onSelect={(keys) => this.handleSelectTreeNode(keys, model)}
        draggable
        onDrop={this.handleModelTreeDrop}
      >
        {this.buildTreeDom(model)}
      </Tree>
    );
  }

  addModalControl = action(() => {
    const instance = registerTable.createModelInstance('modal');
    this.modalListContainer.push(instance);
  })

  findModalParent(model) {
    while (model !== null) {
      if (model.viewType === 'modal') {
        return model;
      }
      model = model.parentContainer;
    }
    return null;
  }

  renderModalArea(currentSelectedModel) {
    const modalParent = this.findModalParent(currentSelectedModel);
    if (modalParent) {
      return this.renderShowArea(modalParent);
    }
    return null;
  }

  renderDesignTab() {
    return (
      <div className="design-comp">
        <div className="flex-container">
          <div className="model-tree-area">
            <div className="m-10">
              <Button type="primary" onClick={this.addModalControl}>添加模态窗口</Button>
            </div>
            <Tag color="blue">对象树</Tag>
            {
              this.modalListContainer.children.map((modalModel) => this.renderModelTree(modalModel, modalModel.id))
            }
            {this.renderModelTree(this.mainContainer, this.mainContainer.id)}
          </div>

          <div className="phone-simulator-375" id="real-page-root">
            {this.renderModalArea(this.currentSelectedModel)}
            <div className="scroll-container">
              {this.renderShowArea(this.mainContainer)}
            </div>
          </div>

          <div className="model-edit-area">
            {this.renderEditArea(this.currentSelectedModel)}
          </div>
        </div>
      </div>
    );
  }

  renderSaveForm() {
    return (
      <BackEndForm designModel={this.designModel} />
    );
  }

  render() {
    return (
      <Tabs tabPosition="left">
        <TabPane tab="设计" key="1">
          {this.renderDesignTab()}
        </TabPane>
        <TabPane tab="保存" key="2">
          {this.renderSaveForm()}
        </TabPane>
      </Tabs>
    );
  }
}

export default DesignComp;
