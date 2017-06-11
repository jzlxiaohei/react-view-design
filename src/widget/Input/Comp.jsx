import React from 'react';
import showView, { showViewPropTypes } from 'hoc/showView';

@showView()
class ShowInput extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }

  render() {
    const props = this.props;
    const { attr } = props;
    return (
      <input
        className="comp_show-input"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
        placeholder={attr.placeholder}
      />
    );
  }
}

export default ShowInput;
