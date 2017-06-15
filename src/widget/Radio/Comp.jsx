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
        type="radio"
        className="comp_show-radio"
        name={attr.name}
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      />
    );
  }
}

export default ShowInput;
