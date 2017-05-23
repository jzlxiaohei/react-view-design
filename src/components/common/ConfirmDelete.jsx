import React, { PropTypes } from 'react';
import { Popconfirm } from 'antd';

class DeleteOperation extends React.Component {

  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  render() {
    return (
      <Popconfirm
        placement="top"
        title="Are you sure?" okText="Yes" cancelText="No"
        {...this.props}
        onConfirm={this.props.onConfirm}
      >
        {this.props.children || <a className="danger-action">Delete</a>}
      </Popconfirm>
    );
  }
}

export default DeleteOperation;
