import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, message } from 'antd';
import { ModelPicture } from 'widget/Picture';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';

@observer
class EditPicture extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ModelPicture).isRequired,
    onRemove: PropTypes.func,
  }

  handleAutoSizeImg = () => {
    const model = this.props.model;
    const url = model.attr.url;
    const img = new Image();
    img.onload = () => {
      model.adjustImgSize({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      message.error('获取图片信息失败，请检测url');
    };
    img.src = url;
  }

  render() {
    const model = this.props.model;
    return (
      <div className="edit-picture">
        <DefaultModelEdit model={model} onRemove={this.props.onRemove} />
        <Button type="primary" onClick={this.handleAutoSizeImg}>调整图片到原始比例</Button>
        <DefaultPropertyEdit model={model} />
      </div>
    );
  }
}

export default EditPicture;
