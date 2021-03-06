import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import _ from 'lodash';
import { Select } from 'antd';
import FormItemWrapper from './FormItemWrapper';
import CommonExcludedProps from './constants/CommonExcluedProps';

@observer
class FormSelect extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    formItemProps: PropTypes.object,
    label: PropTypes.string,
    model: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    children: PropTypes.array,
  };

  handleChange = (value) => {
    runInAction('change by select value', () => {
      _.set(this.props.model, this.props.path, value);
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const inputProps = _.omit(this.props, CommonExcludedProps);
    const value = _.get(this.props.model, this.props.path);
    return (
      <FormItemWrapper
        label={this.props.label} formItemProps={this.props.formItemProps}
        model={this.props.model} path={this.props.path}
      >
        <Select value={value} {...inputProps} onChange={this.handleChange}>
          {this.props.children}
        </Select>
      </FormItemWrapper>
    );
  }
}

export default FormSelect;
