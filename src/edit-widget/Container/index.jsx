import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Icon, Popover } from 'antd';
// import registerTable from 'globals/registerTable';
import WidgetBase from 'widget/WidgetBase';

@observer
class Container extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase).isRequired,
    viewTypes: PropTypes.array.isRequired,
    createModelInstanceWithId: PropTypes.func.isRequired,
  }

  handleViewTypeClick = (viewType) => {
    const instance = this.props.createModelInstanceWithId(viewType);
    this.props.model.push(instance);
  }

  renderChildComponent() {
    const viewTypes = this.props.viewTypes;
    return (
      <div className="view-type-widget-selector">
        {
          viewTypes.map((v, index) => {
            return (
              <div
                key={index} className="view-type-item"
                onClick={() => this.handleViewTypeClick(v)}
              >{v}
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="edit-container">
        <Popover trigger="click" title="添加子控件" content={this.renderChildComponent()}>
          <Icon type="plus" />
        </Popover>
      </div>
    );
  }
}

export default Container;
