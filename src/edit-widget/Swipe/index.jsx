import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, Card, Tag } from 'antd';
import { ModelSwipe } from 'widget/Swipe';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';
import ConfirmDelete from 'comps/common/ConfirmDelete';

@observer
class EditSwipe extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ModelSwipe).isRequired,
    onRemove: PropTypes.func,
  }


  initSwipe = () => {
    const id = this.props.model.getDomId();
    window.$idRefMap[id].initSwipe();
  }

  addSlide = () => {
    const model = this.props.model;
    model.addSlide();
    const id = model.getDomId();
    window.$idRefMap[id].killSwipe();
  }

  renderChildren(children) {
    return children.map(child => {
      return (
        <div key={child.id}>
          <Tag className="child-id">{child.id}</Tag>
          <ConfirmDelete onConfirm={() => this.handelDeleteModel(child)} />
        </div>
      );
    });
  }

  render() {
    const { model, onRemove } = this.props;
    return (
      <div className="edit-swipe">
        <DefaultModelEdit model={model} onRemove={onRemove} />
        <Button type="primary" onClick={this.addSlide}>添加slide</Button>
        <Button type="primary" onClick={this.initSwipe}>开始</Button>
        <DefaultPropertyEdit model={model} />
        <Card title="slides" className="edit-child-list ml-20">
          {this.renderChildren(model.children)}
        </Card>
      </div>
    );
  }
}

export default EditSwipe;
