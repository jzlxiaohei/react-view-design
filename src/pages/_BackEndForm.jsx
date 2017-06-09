import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, message } from 'antd';
import { FormInput, FormCheckbox } from 'comps/form';
import DesignModel from './DesignModel';

@observer
class BackEndForm extends React.Component {

  static propTypes = {
    designModel: PropTypes.instanceOf(DesignModel).isRequired,
  }

  handleSave = () => {
    this.props.designModel
      .post()
      .then(() => {
        message.success('保存成果');
      });
  }

  render() {
    const designModel = this.props.designModel;
    return (
      <div className="design-form">
        <FormInput label="design id" model={designModel} path="designId" />
        <FormInput label="note" model={designModel} path="note" type="textarea" />
        <FormCheckbox label="如果design id已经存在，也强制覆盖" model={designModel} path="force" />
        <Button type="primary" onClick={this.handleSave}>保存</Button>
      </div>
    );
  }
}

export default BackEndForm;
