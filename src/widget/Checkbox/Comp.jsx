import React from 'react';
import showView, { showViewPropTypes } from 'hoc/showView';

import style from './checkbox.scss';

@showView({ style })
class ShowCheckbox extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }

  handleChange = (e) => {
    this.props.model.assignAttr({
      checked: e.target.checked,
    });
  }

  render() {
    const props = this.props;
    const { attr } = props;
    return (
      <label className="comp_checkbox-wrapper">
        <input
          type="checkbox"
          className="comp_show-checkbox"
          name={attr.name}
          checked={attr.checked}
          onChange={this.handleChange}
        />
        <span
          className="checkbox-icon"
          {...props.otherProps}
          style={props.style}
          id={props.id}
          {...props.dataAttr}
        />
        {props.childrenList}
      </label>
    );
  }
}

export default ShowCheckbox;
