import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { ModelPicture } from 'widget/Picture';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';

@observer
class EditPicture extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ModelPicture).isRequired,
    onRemove: PropTypes.func,
  }

  render() {
    const model = this.props.model;
    return (
      <div className="edit-picture">
        <DefaultModelEdit model={model} onRemove={this.props.onRemove} />
        {/* <Button type="primary" onClick={this.handleAutoSizeImg}>调整图片到原始比例</Button>*/}
        <DefaultPropertyEdit model={model} />
      </div>
    );
  }
}

export default EditPicture;
