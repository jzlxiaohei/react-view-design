import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { Tag } from 'antd';
// import registerTable from 'globals/registerTable';
import WidgetBase from 'widget/WidgetBase';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';
import DefaultAddChildEdit from 'comps/defaultAddChildEdit';
import DefaultChildrenList from 'comps/defaultChildrenList';
import ConfirmDelete from 'comps/common/ConfirmDelete';
import SortableList from 'comps/sortableList';

import './index.scss';

@observer
class Container extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase).isRequired,
    viewTypesConfig: PropTypes.object.isRequired,
    createModelInstanceWithId: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    onChildAdd: PropTypes.func,
  }

  handelDeleteModel = (child) => {
    if (this.props.onRemove) {
      this.props.onRemove(child);
    }
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
              <ConfirmDelete onConfirm={() => this.handelDeleteModel(child)} />
            </div>
          );
        })}
        onEnd={this.handleSortEnd}
      />
    );
  }

  render() {
    const { model, onRemove, onChildAdd, viewTypesConfig, createModelInstanceWithId } = this.props;
    return (
      <div className="default-edit-widget">
        <DefaultModelEdit model={model} onRemove={onRemove} />
        {
          model.isContainer ?
            <DefaultAddChildEdit
              model={model}
              onChildAdd={onChildAdd}
              viewTypesConfig={viewTypesConfig}
              createModelInstanceWithId={createModelInstanceWithId}
            />
            : null
        }
        <DefaultPropertyEdit model={model} />
        {
          model.isContainer ?
            <DefaultChildrenList model={model} onRemove={onRemove} />
            : null
        }
      </div>
    );
  }
}

export default Container;
