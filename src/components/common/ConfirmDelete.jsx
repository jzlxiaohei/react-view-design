import React, { PropTypes } from 'react';
import { Popconfirm } from 'antd';

class DeleteOperation extends React.Component {

  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    children: PropTypes.any,
    title: PropTypes.node,
  };

  render() {
    return (
      <Popconfirm
        placement="top"
        title={this.props.title || 'sure to delete?'} okText="Yes" cancelText="No"
        {...this.props}
        onConfirm={this.props.onConfirm}
      >
        {this.props.children || <a className="danger-action">Delete</a>}
      </Popconfirm>
    );
  }
}

export default DeleteOperation;
