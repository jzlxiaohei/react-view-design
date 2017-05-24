import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import WidgetBase from 'widget/WidgetBase';
import EditProperty from './EditProperty';

@observer
class DefaultPropertyEdit extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase).isRequired,

  }

  handleAddStyleItem = (item) => {
    const model = this.props.model;
    const { key, value } = item;
    if (!key) return;
    model.assignStyle({
      [key]: value,
    });
  }

  render() {
    const model = this.props.model;
    return (
      <div className="default-edit-style-attr">
        <EditProperty properties={model.attr} propertyConfig={model.attrConfig} />
        <EditProperty
          properties={model.style}
          propertyConfig={model.styleConfig}
          allowedAdd
          onAddItem={this.handleAddStyleItem}
        />
      </div>
    );
  }
}

export default DefaultPropertyEdit;
