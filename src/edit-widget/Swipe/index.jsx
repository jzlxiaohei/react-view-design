import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { Button, Tag } from 'antd';
import { ModelSwipe } from 'widget/Swipe';
import SortableList from 'comps/sortableList';
import { FormCheckbox } from 'comps/form';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';
import DefaultChildrenList from 'comps/defaultChildrenList';
import ConfirmDelete from 'comps/common/ConfirmDelete';

@observer
class EditSwipe extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ModelSwipe).isRequired,
    onRemove: PropTypes.func,
  }


  initSwipe = (options) => {
    this.killSwipe();
    const id = this.props.model.getDomId();
    window.$idRefMap[id].initSwipe(options);
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

  handleSortEnd = (e) => {
    const { oldIndex, newIndex } = e;
    if (oldIndex === newIndex) {
      return;
    }
    const list = this.props.model.children;
    runInAction('move item for list', () => {
      const moveItem = list.splice(oldIndex, 1)[0];
      list.splice(newIndex, 0, moveItem);
    });
  }

  renderChildren(children) {
    return (
      <SortableList
        list={children}
        renderItem={(child => {
          return (
            <div key={child.id} className="mtb-10">
              <Tag className="child-id">{child.id}</Tag>
              <ConfirmDelete onConfirm={() => this.handelRemove(child)} />
            </div>
          );
        })}
        onEnd={this.handleSortEnd}
      />
    );
  }

  handelRemove = (model) => {
    if (this.props.onRemove) {
      this.props.onRemove(model);
    }
    this.initSwipe();
  }

  handelPlay = (value) => {
    this.initSwipe({
      auto: value,
    });
  }

  render() {
    const { model, onRemove } = this.props;
    return (
      <div className="edit-swipe">
        <DefaultModelEdit model={model} onRemove={this.handelRemove} />
        <Button type="primary" onClick={this.addSlide}>添加slide</Button>
        <Button className="ml-15" type="primary" onClick={this.initSwipe}>从新初始化</Button>
        <FormCheckbox model={model} path="attr.play" onChange={this.handelPlay}>
          是否开启动画
        </FormCheckbox>
        <DefaultPropertyEdit
          model={model}
          ignoreFileds={{
            attr: ['play'],
          }}
        />
        <DefaultChildrenList model={model} onRemove={onRemove} />
      </div>
    );
  }
}

export default EditSwipe;
