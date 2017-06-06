import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import _ from 'lodash';
import WidgetBase from 'widget/WidgetBase';
import EditProperty from './EditProperty';

@observer
class DefaultPropertyEdit extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase).isRequired,
    ignoreFileds: PropTypes.shape({
      attr: PropTypes.arrayOf(PropTypes.string),
      style: PropTypes.arrayOf(PropTypes.string),
    }),
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
    const { model, ignoreFileds = {} } = this.props;
    return (
      <div className="default-edit-style-attr">
        <EditProperty
          properties={model.attr}
          propertyConfig={model.attrConfig}
          ignoreFileds={ignoreFileds.attr}
        />
        <EditProperty
          properties={model.style}
          propertyConfig={model.styleConfig}
          allowedAdd
          onAddItem={this.handleAddStyleItem}
          ignoreFileds={ignoreFileds.style}
        />
      </div>
    );
  }
}

export default DefaultPropertyEdit;
