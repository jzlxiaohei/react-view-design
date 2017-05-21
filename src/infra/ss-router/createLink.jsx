import React from 'react';
import PropTypes from 'prop-types';

function createLink(history) {
  return class Link extends React.Component {

    static propTypes = {
      to: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      children: PropTypes.any,
    };

    handleClick = (event) => {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      /* left click */
      if (event.button !== 0) {
        return;
      }

      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      if (event.defaultPrevented === true) {
        return;
      }

      event.preventDefault();
      if (this.props.to) {
        history.push(this.props.to);
      } else {
        history.push({ pathname: event.currentTarget.pathname, search: event.currentTarget.search });
      }
    };

    render() {
      const {
        to,
        ...props
      } = this.props;
      return (
        <a href={to} {...props} onClick={this.handleClick}>
          {this.props.children}
        </a>
      );
    }
  };
}

export default createLink;
