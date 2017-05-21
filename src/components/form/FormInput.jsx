import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import _ from 'lodash';
import { Input } from 'antd';
import FormItemWrapper from './FormItemWrapper';
import CommonExcludedProps from './constants/CommonExcluedProps';

@observer
class FormInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    formItemProps: PropTypes.object,
    label: PropTypes.string,
    model: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
  };

  handleChange = (e) => {
    runInAction('change by input value', () => {
      _.set(this.props.model, this.props.path, e.target.value);
    });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    const inputProps = _.omit(this.props, CommonExcludedProps);
    return (
      <FormItemWrapper
        label={this.props.label} formItemProps={this.props.formItemProps}
        model={this.props.model} path={this.props.path}
      >
        <Input
          {...inputProps}
          value={_.get(this.props.model, this.props.path)} onChange={this.handleChange}
        />
      </FormItemWrapper>
    );
  }
}

export default FormInput;
