import React from 'react';
// import PropTypes from 'prop-types';
// import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import { message } from 'antd';
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

  handleAutoSizeImg = () => {
    const model = this.props.model;
    const url = model.attr.url;
    this.adjustImgSize(url);
  }

  adjustImgSize = (url) => {
    const model = this.props.model;
    const img = new Image();
    img.onload = () => {
      model.adjustImgSize({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      message.error('获取图片信息失败，请检测url');
    };
    img.src = url;
  }

  componentDidMount() {
    this.disposerForAutorun = autorun(() => {
      const model = this.props.model;
      const url = model.attr.url;
      this.adjustImgSize(url);
    });
  }

  componentWillUnmount() {
    if (this.disposerForAutorun) {
      this.disposerForAutorun();
    }
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
