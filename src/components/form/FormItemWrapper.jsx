import React, { PropTypes } from 'react';
import { Form } from 'antd';
import _ from 'lodash';
import { observer } from 'mobx-react';
import cn from 'classnames';
/* eslint-disable react/prefer-stateless-function */
@observer
class FormItemWrapper extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    formItemProps: PropTypes.object,
    children: PropTypes.element.isRequired,
    model: PropTypes.object,
    path: PropTypes.string,
    formWrapperClassName: PropTypes.string,
  };

  render() {
    const { model, path, formItemProps } = this.props;
    let validMsg = false;
    if (model && model.$hasRules && model.$hasRules()) {
      validMsg = model.$validState[path];
    }
    const className = cn('comp_form-wrapper', this.props.formWrapperClassName);
    return (
      <Form.Item
        className={className}
        validateStatus={_.isString(validMsg) ? 'error' : ''}
        help={validMsg}
        {...formItemProps}
        label={this.props.label}
      >
        {this.props.children}
      </Form.Item>
    );
  }
}

export default FormItemWrapper;
