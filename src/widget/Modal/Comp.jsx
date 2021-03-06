import React from 'react';
import showView, { showViewPropTypes } from 'hoc/showView';
import style from './style.scss';
// import { CompContainer } from '../Container';

@showView({ style })
class ShowModal extends React.Component {

  static propTypes = {
    // model: PropTypes.instanceOf(Picture),
    ...showViewPropTypes,
  }

  isCurrentModelParent() {
    let selectedModel = this.props.designViewProps.currentSelectedModel;
    while (selectedModel) {
      if (selectedModel === this.props.model) {
        return true;
      }
      selectedModel = selectedModel.parentContainer;
    }
    return false;
  }

  componentDidMount() {
    const modalDom = this.getModalDom();
    this.hideModal = (e) => {
      e.stopPropagation();
      if (e.target == modalDom) {
        modalDom.style.display = 'none';
      }
    };
    modalDom.addEventListener('click', this.hideModal);
  }

  getModalDom = () => {
    const id = this.props.id;
    return document.getElementById(id);
  }

  componentWillUnmount() {
    this.removeTriggerEvent();
    const modalDom = this.getModalDom();
    modalDom.removeEventListener('click', this.hideModal);
  }

  removeTriggerEvent() {
    if (this.triggerDom) {
      this.triggerDom.removeTriggerEvent('click', this.bindTriggerEvent);
      this.triggerDom = null;
    }
  }

  bindShowModelToTriggerId() {
    const triggerId = this.props.attr.triggerId;
    if (!triggerId) return;
    const triggerDom = document.getElementById(triggerId);
    if (!triggerDom) return;
    this.removeTriggerEvent();
    this.bindTriggerEvent = () => {
      const modalDom = this.getModalDom();
      modalDom.style.display = 'block';
    };
    triggerDom.addEventListener('click', this.bindTriggerEvent);
  }

  render() {
    const props = this.props;
    // const containerStyle = {};
    this.bindShowModelToTriggerId();
    // if (props.attr.containerBg) {
    //   containerStyle.background = props.attr.containerBg;
    // }
    if (!__IS_NODE__) {
      if (this.isCurrentModelParent()) {
        // use containerStyle.style.display = 'block' not working !!?
        setTimeout(() => {
          const modalDom = this.getModalDom();
          modalDom.style.display = 'block';
        }, 0);
      } else {
        setTimeout(() => {
          const modalDom = this.getModalDom();
          modalDom.style.display = 'none';
        }, 0);
      }
    }
    return (
      <div
        className="comp_show-modal"
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

export default ShowModal;
