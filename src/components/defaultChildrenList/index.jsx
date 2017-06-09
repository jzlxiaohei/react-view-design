import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { runInAction, action } from 'mobx';
import { Card, Tag, Button } from 'antd';
import registerTable from 'globals/registerTable';
import WidgetBase from 'widget/WidgetBase';
import SortableList from 'comps/sortableList';
import ConfirmDelete from 'comps/common/ConfirmDelete';

@observer
class EditSwipe extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase).isRequired,
    onRemove: PropTypes.func,
    title: PropTypes.string,
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

  handelDeleteModel = (child) => {
    if (this.props.onRemove) {
      this.props.onRemove(child);
    }
  }

  handelCloneChild = action((child) => {
    const { model } = this.props;
    const clonedChild = child.clone();
    model.push(clonedChild);
  });

  renderChildren(children) {
    return (
      <SortableList
        list={children}
        renderItem={(child => {
          return (
            <div key={child.id} className="mtb-10">
              <Tag className="child-id">{child.id}</Tag>
              <Button onClick={() => this.handelCloneChild(child)}>复制</Button>
              <ConfirmDelete onConfirm={() => this.handelDeleteModel(child)} />
            </div>
          );
        })}
        onEnd={this.handleSortEnd}
      />
    );
  }

  render() {
    const { model } = this.props;
    return (
      <div className="default-edit-children-list">
        <Card title={this.props.title || '子组件'} className="edit-child-list ml-20">
          {this.renderChildren(model.children)}
        </Card>
      </div>
    );
  }
}

export default EditSwipe;
