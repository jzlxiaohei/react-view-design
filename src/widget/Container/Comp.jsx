import React from 'react';
import showView, { showViewPropTypes } from 'hoc/showView';

@showView()
// @observer
class WidgetContainer extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }

  render() {
    const props = this.props;
    return (
      <div
        className="common-widget-container"
        {...props.otherProps}
        {...props.dataAttr}
        style={props.style}
        id={props.id}
      >
        {this.props.childrenList}
      </div>
    );
  }
}

export default WidgetContainer;
