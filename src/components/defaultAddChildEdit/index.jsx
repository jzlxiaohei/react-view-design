import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Icon, Popover } from 'antd';
import _ from 'lodash';
import WidgetBase from 'widget/WidgetBase';

@observer
class DefaultModelEdit extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase).isRequired,
    viewTypesConfig: PropTypes.object.isRequired,
    createModelInstanceWithId: PropTypes.func.isRequired,
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

  render() {
    return (
      <Popover
        trigger="click" title="添加子控件" overlayClassName="edit-container-add-child"
        content={this.renderPopoverAddChildComponent()}
      >
        <div className="add-child">
          <Icon type="plus" /> 添加子控件
        </div>
      </Popover>
    );
  }
}

export default DefaultModelEdit;
