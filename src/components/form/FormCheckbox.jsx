import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import _ from 'lodash';
import { Checkbox } from 'antd';
import FormItemWrapper from './FormItemWrapper';
import CommonExcludedProps from './constants/CommonExcluedProps';

@observer
class FormCheckbox extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    formItemProps: PropTypes.object,
    label: PropTypes.string,
    model: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  handleChange = (e) => {
    const value = e.target.checked;
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
        formItemProps={this.props.formItemProps}
        model={this.props.model} path={this.props.path}
      >
        {this.props.children ?
          <Checkbox checked={value} {...inputProps} onChange={this.handleChange}>
            {this.props.children}
          </Checkbox>
          : <Checkbox checked={value} {...inputProps} onChange={this.handleChange}>{this.props.label}</Checkbox>
        }
      </FormItemWrapper>
    );
  }
}

export default FormCheckbox;
