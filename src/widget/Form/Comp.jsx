import React, { PropTypes } from 'react';
import showView, { showViewPropTypes } from 'hoc/showView';

@showView()
class ShowInput extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
    label: PropTypes.string,
    type: PropTypes.string,
  }

  render() {
    const { attr } = this.props;
    if (!attr.field) {
      return (
        <div className="danger-action">
          field(字段名) 必须提供，才可以编辑文本框
        </div>
      );
    }
    return (
      <div className="comp_show-input-item">
        <span className="comp_show-label">{attr.label}</span>
        <input className="comp_show-item" type={attr.type} />
      </div>
    );
  }
}

@showView()
class ShowForm extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }

  renderChild(childModel, index) {
    return <ShowInput key={index} model={childModel} {...this.props.designViewProps} />;
  }

  render() {
    const props = this.props;
    return (
      <div
        className="comp_show-form"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      >
        {props.modelChildren.map((childModel, index) => this.renderChild(childModel, index))}
      </div>
    );
  }
}

export default ShowForm;
