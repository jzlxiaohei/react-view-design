import React from 'react';
import registerTable from 'globals/registerTable';
import showView, { showViewPropTypes } from 'hoc/showView';
import style from './style.scss';
// import { CompContainer } from '../Container';

@showView({ style })
class ShowModal extends React.Component {

  static propTypes = {
    // model: PropTypes.instanceOf(Picture),
    ...showViewPropTypes,
  }

  renderChild(childModel, index) {
    const viewType = childModel.viewType;
    const ShowComp = registerTable.getShowComp(viewType);
    return <ShowComp key={index} model={childModel} {...this.props.designViewProps} />;
  }

  isCurrentModelParent() {
    let selectedModel = this.props.designViewProps.currentSelectedModel;
    while (selectedModel !== null) {
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
    const containerStyle = {};
    this.bindShowModelToTriggerId();
    if (props.attr.containerBg) {
      containerStyle.background = props.attr.containerBg;
    }
    const className = 'comp_show-modal';
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
    return (
      <div id={props.id} className={className} style={containerStyle} >
        <div
          {...props.otherProps}
          style={props.style}
          {...props.dataAttr}
        >
          {props.modelChildren.map((childModel, index) => this.renderChild(childModel, index))}
        </div>
      </div>
    );
  }
}

export default ShowModal;
