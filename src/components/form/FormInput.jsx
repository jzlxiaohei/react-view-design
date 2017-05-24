import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import _ from 'lodash';
import { Input, Icon, Popover } from 'antd';
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
    enableDetailEdit: PropTypes.bool,
  };

  static defaultProps = {
    enableDetailEdit: true,
  }

  handleChange = (e) => {
    runInAction('change by input value', () => {
      _.set(this.props.model, this.props.path, e.target.value);
    });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    const inputProps = _.omit(this.props, CommonExcludedProps, 'enableDetailEdit');
    const value = _.get(this.props.model, this.props.path);
    return (
      <FormItemWrapper
        label={this.props.label} formItemProps={this.props.formItemProps}
        model={this.props.model} path={this.props.path}
      >
        <div className="input-with-detail-edit">
          <Input
            {...inputProps}
            value={value} onChange={this.handleChange}
          />
          {
            this.props.enableDetailEdit ? (
              <Popover
                title="详细编辑"
                trigger="click"
                overlayClassName="comp_form-input-popover-edit"
                content={
                  <Input type="textarea" autosize={{ minRows: 3 }} value={value} onChange={this.handleChange} />
                }
              >
                <Icon className="trigger-detail-icon" type="down-circle-o" />
              </Popover>
            ) : null
          }
        </div>
      </FormItemWrapper>
    );
  }
}

export default FormInput;
