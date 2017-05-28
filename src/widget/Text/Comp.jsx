import React from 'react';
import showView, { showViewPropTypes } from 'hoc/showView';


@showView()
class ShowPicture extends React.Component {

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
        {
          attr.content.map(
            (text, index) => <div className="text" key={index}>{text}</div>,
          )
        }
      </div>
    );
  }
}

export default ShowPicture;
