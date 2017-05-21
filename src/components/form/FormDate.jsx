import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import _ from 'lodash';
import moment from 'moment';
import { DatePicker } from 'antd';
import FormItemWrapper from './FormItemWrapper';
import CommonExcludedProps from './constants/CommonExcluedProps';

function timestamp2moment(timestamp) {
  if (!timestamp) {
    return null;
  }
  return moment(new Date(timestamp * 1000));
}

function moment2timestamp(momentObj) {
  if (!momentObj) {
    return null;
  }
  return Math.round(momentObj.unix());
}


@observer
class FormDate extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    formItemProps: PropTypes.object,
    label: PropTypes.string,
    model: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    valueModelToControl: PropTypes.func,
    valueControlToModel: PropTypes.func,
  };

  static defaultProps = {
    valueModelToControl: timestamp2moment,
    valueControlToModel: moment2timestamp,
  };


  handleChange = (momentDate, dateStr) => {
    runInAction('change by input value', () => {
      _.set(this.props.model, this.props.path, this.props.valueControlToModel(momentDate));
    });

    if (this.props.onChange) {
      this.props.onChange(momentDate, dateStr);
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
        <DatePicker {...inputProps} value={this.props.valueModelToControl(value)} onChange={this.handleChange} />
      </FormItemWrapper>
    );
  }
}

export default FormDate;
