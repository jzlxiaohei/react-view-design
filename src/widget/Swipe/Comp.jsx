// use: https://github.com/lyfeyaj/swipe
import React from 'react';
import registerTable from 'globals/registerTable';
import showView, { showViewPropTypes } from 'hoc/showView';
// import _ from 'lodash';
import Swipe from 'swipejs';
import style from './style.scss';
import script from './swipe.entry-script';
// @showView({ style })

@showView({ style, script })
class ShowSwipe extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }


  renderChild(childModel, index) {
    const viewType = childModel.viewType;
    const ShowComp = registerTable.getShowComp(viewType);
    return <ShowComp key={index} model={childModel} {...this.props.designViewProps} />;
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
    const id = this.props.id;
    const dom = document.getElementById(id);
    const swipeOptions = this.getSwipeOptions();
    this.swipe = new Swipe(dom, swipeOptions);
  }

  killSwipe = () => {
    if (this.swipe) {
      this.swipe.kill();
      this.swipe = null;
    }
  }

  getSwipeOptions = () => {
    const attr = this.props.attr;
    const swipeOptions = {
      startSlide: 0,
      auto: attr.play ? attr.playTime : false,
      speed: 800,
      draggable: true,
      continuous: true,
      disableScroll: true,
      stopPropagation: true,
    };
    return swipeOptions;
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
        data-swipe-options={JSON.stringify(this.getSwipeOptions())}
      >
        <div className="swipe-wrap">
          {props.modelChildren.map((childModel, index) => this.renderChild(childModel, index))}
        </div>
      </div>
    );
  }
}

export default ShowSwipe;
