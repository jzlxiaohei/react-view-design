import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, Card, Tag } from 'antd';
import { ModelModal } from 'widget/Modal';
import { FormCheckbox } from 'comps/form';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';
import ConfirmDelete from 'comps/common/ConfirmDelete';

@observer
class EditModal extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ModelModal).isRequired,
    onRemove: PropTypes.func,
  }

  componentDidMount() {
    const { model } = this.props;
    model.assignStyle({
      display: 'initial',
      // position: 'absolute',
    });
  }

  componentWillUnmount() {
    const { model } = this.props;
    model.assignStyle({
      display: 'none',
    });
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

  handelPlay = (value) => {
    this.initSwipe({
      auto: value,
    });
  }

  render() {
    const { model } = this.props;
    return (
      <div className="edit-swipe">
        <DefaultModelEdit model={model} onRemove={this.handelRemove} />
        <DefaultPropertyEdit
          model={model}
          ignoreFileds={{
            style: ['display'],
          }}
        />
        <Card title="slides" className="edit-child-list ml-20">
          {this.renderChildren(model.children)}
        </Card>
      </div>
    );
  }
}

export default EditModal;
