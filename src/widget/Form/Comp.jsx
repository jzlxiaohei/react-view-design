import React from 'react';
import showView, { showViewPropTypes } from 'hoc/showView';
// import { CompButton } from '../Button';

@showView()
class ShowLabel extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }

  render() {
    const props = this.props;
    const { attr } = this.props;
    return (
      <label
        className="comp_show-input-label"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      >
        {attr.text}
      </label>
    );
  }
}

// @showView()
// class ShowInput extends React.Component {
//   static propTypes = {
//     ...showViewPropTypes,
//   }

//   render() {
//     const props = this.props;
//     const { attr } = props;
//     if (!attr.field) {
//       return (
//         <div className="danger-action">
//           field(字段名) 必须提供，才可以编辑文本框
//         </div>
//       );
//     }
//     const propsObj = {
//       className: 'comp_show-input',
//       ...props.otherProps,
//       style: props.style,
//       id: props.id,
//       ...props.dataAttr,
//     };
//     return (
//       attr.type == 'textarea' ?
//         <textarea {...propsObj} /> :
//         <input {...propsObj} type={attr.type} />
//     );
//   }
// }

@showView()
class ShowInputWrapper extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }

  render() {
    const props = this.props;

    return (
      <div
        className="comp_show-input-item"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      >
        {this.props.childrenList}
      </div>
    );
  }
}

@showView()
class ShowFormInputContainer extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }

  render() {
    const props = this.props;
    return (
      <div
        className="comp_form-input-container"
        {...props.otherProps}
        {...props.dataAttr}
        style={props.style}
        id={props.id}
      >
        {this.props.childrenList}
      </div>
    );
  }

}

@showView()
class ShowForm extends React.Component {

  static propTypes = {
    ...showViewPropTypes,
  }

  render() {
    const props = this.props;

    return (
      <form
        className="comp_show-form"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      >
        {this.props.childrenList}
      </form>
    );
  }
}

export default ShowForm;
export {
  ShowFormInputContainer,
  ShowInputWrapper,
  // ShowInput,
  ShowLabel,
};
