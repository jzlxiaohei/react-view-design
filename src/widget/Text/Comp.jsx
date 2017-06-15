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
      <span
        className="comp_show-text"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      >
        {
          attr.content.map(
            (text, index) => <span className="text" key={index}>{index !== 0 ? <br /> : null}{text}</span>,
          )
        }
      </span>
    );
  }
}

export default ShowEdit;
