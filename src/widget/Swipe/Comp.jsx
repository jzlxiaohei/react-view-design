// use: https://github.com/lyfeyaj/swipe
import React from 'react';
import registerTable from 'globals/registerTable';
import showView, { showViewPropTypes } from 'hoc/showView';

// @showView({ style })

@showView()
class ShowPicture extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }

  renderChild(childModel, index) {
    const viewType = childModel.viewType;
    const ShowComp = registerTable.getShowComp(viewType);
    return <ShowComp key={index} model={childModel} {...this.props.showViewProps} />;
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

export default ShowPicture;
