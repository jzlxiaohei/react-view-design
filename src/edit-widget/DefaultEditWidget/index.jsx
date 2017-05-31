import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Icon, Popover, Card, Tag } from 'antd';
// import registerTable from 'globals/registerTable';
import WidgetBase from 'widget/WidgetBase';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';
import ConfirmDelete from 'comps/common/ConfirmDelete';

import './index.scss';

@observer
class Container extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase).isRequired,
    viewTypesConfig: PropTypes.object.isRequired,
    createModelInstanceWithId: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    onChildAdd: PropTypes.func,
  }

  handleViewTypeClick = (viewType) => {
    const instance = this.props.createModelInstanceWithId(viewType);
    this.props.model.push(instance);
    if (this.props.onChildAdd) {
      this.props.onChildAdd(instance, this.props.model);
    }
  }

  renderPopoverAddChildComponent() {
    const viewTypesConfig = this.props.viewTypesConfig;
    return (
      <div className="view-type-widget-selector">
        {
          _.keys(viewTypesConfig).map((viewType, index) => {
            return (
              <div
                key={index} className="view-type-item"
                onClick={() => this.handleViewTypeClick(viewType)}
              >
                {viewTypesConfig[viewType].title}
              </div>
            );
          })
        }
      </div>
    );
  }

  handelDeleteModel = (child) => {
    if (this.props.onRemove) {
      this.props.onRemove(child);
    }
  }

  renderChildren(children) {
    return children.map(child => {
      return (
        <div key={child.id}>
          <Tag className="child-id">{child.id}</Tag>
          <ConfirmDelete onConfirm={() => this.handelDeleteModel(child)} />
        </div>
      );
    });
  }

  render() {
    const { model, onRemove } = this.props;
    return (
      <div className="default-edit-widget">
        <DefaultModelEdit model={model} onRemove={onRemove} />
        <Popover
          trigger="click" title="添加子控件" overlayClassName="edit-container-add-child"
          content={this.renderPopoverAddChildComponent()}
        >
          <div className="add-child">
            <Icon type="plus" /> 添加子控件
          </div>
        </Popover>
        <DefaultPropertyEdit model={model} />
        <Card title="子组件" className="edit-child-list ml-20">
          {this.renderChildren(model.children)}
        </Card>
      </div>
    );
  }
}

export default Container;
