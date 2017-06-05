import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, extendObservable } from 'mobx';
import { Tree, Tag, message } from 'antd';
import _ from 'lodash';
import ConfirmDelete from 'comps/common/ConfirmDelete';
import { ModelContainer } from 'widget/WidgetMainContainer';
// import WidgetBase from 'widget/WidgetBase';
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

  // static childContextTypes = {
  //   currentSelectedModel: PropTypes.instanceOf(WidgetBase),
  // }

  // getChildContext() {
  //   return {
  //     currentSelectedModel: this.currentSelectedModel,
  //   };
  // }

  constructor(props) {
    super(props);
    this.mainContainer = this.createModelInstanceWithId('container', 'main-container');
    this.mainContainer.setSelected(true);
    this.mainContainer.notAllowDrag = true;
    extendObservable(this, {
      currentSelectedModel: this.mainContainer,
    });
    this.idSeq = 1;
    this.initMockModel();
  }

  initMockModel() {
    this.mainContainer.assignStyle({
      background: '#FDD100',
    });
    const pic1 = this.mainContainer.push(this.createModelInstanceWithId('picture'));
    pic1.assignAttr({
      url: '//cdn.llsapp.com/hybrid/tydus-banner/assets/cc_with_comment_top.gif',
    });
    const pic2 = this.mainContainer.push(this.createModelInstanceWithId('picture'));
    pic2.assignAttr({
      url: '//cdn.llscdn.com/fe-static/lingome/499-part-1-OEH9HoHx.jpg',
    });

    this.mainContainer.push(
      this.createModelInstanceWithId('picture')
        .assignAttr({
          url: '//cdn.llscdn.com/fe-static/lingome/499-part-2-xDHxZodh.jpg',
        })
        .assignStyle({
          marginTop: '30',
        }),
    );

    this.mainContainer.push(
      this.createModelInstanceWithId('picture')
        .assignAttr({
          url: '//cdn.llscdn.com/fe-static/lingome/499-part-3-cL3xo5ia.jpg',
        })
        .assignStyle({
          marginTop: '30',
        }),
    );


    this.mainContainer.push(this.createModelInstanceWithId('text'));
    const swipeModel = this.mainContainer.push(this.createModelInstanceWithId('swipe'));
    swipeModel.assignStyle({
      width: 320,
      margin: '0 auto',
      padding: '0 10',
    });
    swipeModel.addSlide().push(
      this.createModelInstanceWithId('picture').assignAttr({
        url: '//cdn.llscdn.com/fe-static/lingome/Mark退款学员-BAZIvKM6.png?imageView2/0/w/828',
      }).assignStyle({
        width: 300,
      }),
    );
    swipeModel.addSlide().push(
      this.createModelInstanceWithId('picture').assignAttr({
        url: '//cdn.llscdn.com/fe-static/lingome/Cherry 退款学员-81ybwPX5.png?imageView2/0/w/828',
      }).assignStyle({
        width: 300,
      }),
    );
    swipeModel.addSlide().push(
      this.createModelInstanceWithId('picture').assignAttr({
        url: '//cdn.llscdn.com/fe-static/lingome/未生 退款学员-yQF2gjwP.png?imageView2/0/w/828',
      }).assignStyle({
        width: 300,
      }),
    );

    this.mainContainer.push(this.createModelInstanceWithId('modal'));
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
    return <ShowComp model={model} htmlMode="design" currentSelectedModel={this.currentSelectedModel} />;
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
      selectedModel: this.currentSelectedModel,
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
      <TreeNode mobxModel={model} title={model.id} key={model.id} isLeaf={!model.isContainer}>
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


  handleModelTreeDrop = action((info) => {
    // console.log(info);
    const dropModel = info.node.props.mobxModel;
    const dragModel = info.dragNode.props.mobxModel;
    if (dragModel == this.mainContainer) {
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
      oldParent.remove(dragModel);
    } catch (e) {
      message.error(`拖拽失败：${e.message}`);
      console.error(e);
    }
  })

  renderModelTree(model) {
    return (
      <Tree
        autoExpandParent
        expandedKeys={[this.currentSelectedModel.id]}
        showLine
        onSelect={this.handleSelectTreeNode}
        draggable
        onDrop={this.handleModelTreeDrop}
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
