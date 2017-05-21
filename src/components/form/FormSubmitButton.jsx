import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Button } from 'antd';
import FormItemWrapper from './FormItemWrapper';
import CommonExcludedProps from './constants/CommonExcluedProps';

class FormButton extends React.Component {
  static propTypes = {
    formItemProps: PropTypes.object,
    label: PropTypes.string,
    children: PropTypes.any,
  };

  render() {
    const btnProps = _.omit(this.props, CommonExcludedProps);
    return (
      <div className="comp_form-submit-button">
        <FormItemWrapper
          label={this.props.label || ' '} formItemProps={this.props.formItemProps}
        >
          <Button {...btnProps}>
            {this.props.children}
          </Button>
        </FormItemWrapper>
      </div>
    );
  }
}

export default FormButton;
