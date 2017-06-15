import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';
import DefaultChildrenList from 'comps/defaultChildrenList';
import DefaultAddChildEdit from 'comps/defaultAddChildEdit';
import { Button } from 'antd';
import { ModelForm } from 'widget/Form';


@observer
class EditFormItemContainer extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ModelForm).isRequired,
    createModelInstanceWithId: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    onChildAdd: PropTypes.func,
    viewTypesConfig: PropTypes.object.isRequired,
  }

  addInput = () => {
    const { model } = this.props;
    model.addInput();
  }


  render() {
    const { model, onRemove, onChildAdd, viewTypesConfig, createModelInstanceWithId } = this.props;

    return (
      <div className="edit-form">
        <DefaultModelEdit model={model} onRemove={onRemove} />
        <Button type="primary" onClick={this.addInput}>添加表单项</Button>
        <DefaultAddChildEdit
          model={model}
          onChildAdd={onChildAdd}
          viewTypesConfig={viewTypesConfig}
          createModelInstanceWithId={createModelInstanceWithId}
        />
        <DefaultPropertyEdit model={model} />
        <DefaultChildrenList model={model} onRemove={onRemove} />
      </div>
    );
  }
}

export default EditFormItemContainer;
