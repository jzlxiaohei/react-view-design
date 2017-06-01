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
    this.killSwipe();
    const id = this.props.model.getDomId();
    window.$idRefMap[id].initSwipe();
  }

  killSwipe = () => {
    const id = this.props.model.getDomId();
    window.$idRefMap[id].killSwipe();
  }

  addSlide = () => {
    const model = this.props.model;
    model.addSlide();
    this.initSwipe();
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

  handelRemove = (model) => {
    if (this.props.onRemove) {
      this.props.onRemove(model);
    }
    this.initSwipe();
  }

  render() {
    const { model } = this.props;
    return (
      <div className="edit-swipe">
        <DefaultModelEdit model={model} onRemove={this.handelRemove} />
        <Button type="primary" onClick={this.addSlide}>添加slide</Button>
        <Button className="ml-15" type="primary" onClick={this.initSwipe}>初始化</Button>
        <DefaultPropertyEdit model={model} />
        <Card title="slides" className="edit-child-list ml-20">
          {this.renderChildren(model.children)}
        </Card>
      </div>
    );
  }
}

export default EditSwipe;
