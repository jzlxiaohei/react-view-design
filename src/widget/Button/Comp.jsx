import React from 'react';
import showView, { showViewPropTypes } from 'hoc/showView';


@showView()
class ShowEdit extends React.Component {

  static propTypes = {
    // model: PropTypes.instanceOf(Picture),
    ...showViewPropTypes,
  }


  render() {
    const props = this.props;
    const { attr } = props;
    return (
      <div
        className="comp_show-text"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      >
        {attr.text}
      </div>
    );
  }
}

export default ShowEdit;
