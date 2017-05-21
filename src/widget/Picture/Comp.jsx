import React from 'react';
// import PropTypes from 'prop-types';
// import { observer } from 'mobx-react';
import showView, { showViewPropTypes } from 'hoc/showView';
// import Picture from './Model';
// import style from './index.scss';

// @showView({ style })

@showView()
class ShowPicture extends React.Component {

  static propTypes = {
    // model: PropTypes.instanceOf(Picture),
    ...showViewPropTypes,
  }


  render() {
    const props = this.props;
    const { attr } = props;
    const link = attr.link;
    return (
      <div
        className="comp_show-picture"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      >
        {
          link ? (
            <a href={attr.link} draggable="false">
              <img src={attr.url} style={{ width: '100%', height: '100%' }} draggable="false" />
            </a>
          ) : (
            <img src={attr.url} style={{ width: '100%', height: '100%' }} draggable="false" />
          )
        }
      </div>
    );
  }
}

export default ShowPicture;
