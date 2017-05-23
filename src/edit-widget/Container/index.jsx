import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Icon, Popover } from 'antd';
// import registerTable from 'globals/registerTable';
import WidgetBase from 'widget/WidgetBase';
import DefaultModelEdit from 'comps/defaultModelEdit';

@observer
class Container extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase).isRequired,
    viewTypes: PropTypes.array.isRequired,
    createModelInstanceWithId: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
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
    const { model, onRemove } = this.props;
    return (
      <div className="edit-container">
        <DefaultModelEdit model={model} onRemove={onRemove} />
        <Popover trigger="click" title="添加子控件" content={this.renderChildComponent()}>
          <Icon type="plus" /> 添加子控件
        </Popover>
      </div>
    );
  }
}

export default Container;
