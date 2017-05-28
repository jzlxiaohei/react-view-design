import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Tag } from 'antd';
import WidgetBase from 'widget/WidgetBase';
import ConfirmDelete from 'comps/common/ConfirmDelete';

@observer
class DefaultModelEdit extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase).isRequired,
    noDelete: PropTypes.bool,
    onRemove: PropTypes.func,
  }

  handelDeleteModel = () => {
    if (this.props.onRemove) {
      const model = this.props.model;
      this.props.onRemove(model);
    }
  }

  render() {
    const { noDelete, model } = this.props;
    return (
      <div className="mtb-10">
        <Tag color="red">{model.id}</Tag>
        {
          (noDelete || !model.parentContainer) ?
            null :
            <ConfirmDelete onConfirm={() => this.handelDeleteModel(model)} />
        }
      </div>
    );
  }
}

export default DefaultModelEdit;
