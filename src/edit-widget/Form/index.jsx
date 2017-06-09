import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';
import DefaultChildrenList from 'comps/defaultChildrenList';
import { Button } from 'antd';
import { ModelForm } from 'widget/Form';


@observer
class EditForm extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ModelForm).isRequired,
    onRemove: PropTypes.func,
  }

  addInput = () => {
    const { model } = this.props;
    model.formInputContainer.addInput();
  }


  render() {
    const { model, onRemove } = this.props;
    return (
      <div className="edit-form">
        <DefaultModelEdit model={model} onRemove={onRemove} />
        <Button type="primary" onClick={this.addInput}>添加表单项</Button>
        <DefaultPropertyEdit model={model} />
        <DefaultChildrenList model={model} onRemove={onRemove} />
      </div>
    );
  }
}

export default EditForm;
