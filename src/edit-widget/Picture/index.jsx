import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FormInput, message } from 'comps/form';
import { Button } from 'antd';
import { ModelPicture } from 'widget/Picture';
import DefaultModelEdit from 'comps/defaultModelEdit';

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
        <FormInput label="图片地址" model={model} path="attr.url" />
        <FormInput label="链接地址" model={model} path="attr.link" />
      </div>
    );
  }
}

export default EditPicture;
