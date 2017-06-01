// use: https://github.com/lyfeyaj/swipe
import React from 'react';
import registerTable from 'globals/registerTable';
import showView, { showViewPropTypes } from 'hoc/showView';
// import _ from 'lodash';
import Swipe from 'swipejs';
import style from './style.scss';
// @showView({ style })

@showView({ style })
class ShowSwipe extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }


  renderChild(childModel, index) {
    const viewType = childModel.viewType;
    const ShowComp = registerTable.getShowComp(viewType);
    return <ShowComp key={index} model={childModel} {...this.props.showViewProps} />;
  }

  componentDidMount() {
    this.initSwipe();
  }

  componentWillUnmount() {
    this.killSwipe();
  }

  initSwipe = () => {
    if (this.swipe) {
      this.swipe.kill();
      this.swipe = null;
    }
    const model = this.props.model;
    const domId = model.getDomId();
    const dom = document.getElementById(domId);
    const swipeOptions = {
      startSlide: 0,
      auto: model.attr.play ? model.attr.playTime : false,
      speed: 800,
      draggable: true,
      continuous: true,
      disableScroll: true,
      stopPropagation: true,
    };
    this.swipe = new Swipe(dom, swipeOptions);
  }

  killSwipe = () => {
    if (this.swipe) {
      this.swipe.kill();
      this.swipe = null;
    }
  }

  render() {
    const props = this.props;
    return (
      <div
        className="comp_show-swipe swipe"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      >
        <div className="swipe-wrap">
          {props.modelChildren.map((childModel, index) => this.renderChild(childModel, index))}
        </div>
      </div>
    );
  }
}

export default ShowSwipe;
