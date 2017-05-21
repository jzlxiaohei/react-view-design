import React from 'react';
// import { observer } from 'mobx-react';
import showView, { showViewPropTypes } from 'hoc/showView';
import registerTable from 'globals/registerTable';

@showView()
// @observer
class WidgetContainer extends React.Component {

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
        className="common-widget-container"
        {...props.otherProps}
        {...props.dataAttr}
        style={props.style}
        id={props.id}
      >
        {props.modelChildren.map((childModel, index) => this.renderChild(childModel, index))}
      </div>
    );
  }
}

export default WidgetContainer;
