import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { observer, PropTypes as mobxPropTypes } from 'mobx-react';
import { observable, toJS, action } from 'mobx';
import { FormSelect, FormInput, FormCheckbox } from 'comps/form';
import { Select, Icon, Popover, Button } from 'antd';
import './index.scss';

const Option = Select.Option;

/**
 * {
 *  title: 'label',
 *  type: 'color|text|number',
 *  value: 'defaultValue'
 *  options: [{value, text}],
 * }
*/

@observer
class EditProperty extends React.Component {

  @observable currentKey = ''
  @observable currentValue = ''

  static propTypes = {
    onAddItem: PropTypes.func,
    properties: mobxPropTypes.observableObject,
    propertyConfig: mobxPropTypes.observableObject,
    allowedAdd: PropTypes.bool,
    ignoreFileds: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    allowedAdd: false,
  }

  renderInput(key, config) {
    const model = this.props.properties;
    if (!config) {
      return <FormInput label={key} model={model} path={key} />;
    }
    if (config.options) {
      return (
        <FormSelect
          label={config.title}
          optionLabelProp="text"
          model={model} path={key}
          mode="combobox"
        >
          {config.options.map(option => {
            const text = option.text || option.value;
            return <Option key={option.value} text={text}>{text}</Option>;
          })}
        </FormSelect>
      );
    }
    if (config.type === 'checkbox') {
      return (
        <FormCheckbox model={model} path={key}>
          {config.title}
        </FormCheckbox>
      );
    }
    return <FormInput label={config.title} model={model} path={key} />;
  }

  handelAddItem = action((e) => {
    e.preventDefault();
    if (!this.props.onAddItem) {
      throw new Error('DefaultPropertyEdit: allowedAdd is true, you should provide onAddItem');
    }
    this.props.onAddItem({
      key: this.currentKey,
      value: this.currentValue,
    });
    this.currentKey = '';
    this.currentValue = '';
  })

  renderPopForm() {
    return (
      <form onSubmit={this.handelAddItem}>
        <FormInput enableDetailEdit={false} label="key" model={this} path="currentKey" />
        <FormInput enableDetailEdit={false} label="value" model={this} path="currentValue" />
        <Button htmlType="submit">添加样式属性</Button>
      </form>
    );
  }

  renderAddItem() {
    return (
      <Popover
        trigger="click"
        title="添加样式属性"
        content={this.renderPopForm()}
        overlayClassName="add-property-pop-over"
      >
        <Icon type="plus-circle-o" />
      </Popover>
    );
  }

  render() {
    const { propertyConfig, properties, allowedAdd, ignoreFileds } = this.props;
    return (
      <div className="default-property-edit">
        {
          _.keys(_.omit(properties, ignoreFileds)).map((key) => {
            const configValue = toJS(propertyConfig[key]);
            if (configValue) {
              if (configValue.ignoreEdit) return null;
              configValue.title = configValue.title || key;
            }
            return (
              <div className="default-form-item" key={key}>
                {this.renderInput(key, configValue)}
              </div>)
            ;
          })
        }
        {
          allowedAdd ?
            this.renderAddItem() : null
        }
      </div>
    );
  }
}

export default EditProperty;
