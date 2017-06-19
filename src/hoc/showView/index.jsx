import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Icon } from 'antd';
import _ from 'lodash';
import { DraggableCore } from 'react-draggable';
import registerTable from 'globals/registerTable';
import { appendPx, px2rem } from 'utils/processStyle';
import getDataCustomAttr from 'utils/getDataCustomAttr';
// import WidgetBase from 'widget/WidgetBase';
import './index.scss';

function designStyle(style) {
  return appendPx(style);
}

function previewStyle(style) {
  return px2rem(appendPx(style));
}

if (!__IS_NODE__) {
  window.$idRefMap = {};
}
function saveDomToGlobal(id, dom) {
  if (!__IS_NODE__) {
    window.$idRefMap[id] = dom;
  }
}

function showView(config = {}) {
  return (ComposedComponent) => {
    @observer
    class ShowCompWrapper extends React.PureComponent {

      constructor(props) {
        super(props);
        this.state = {
          x: 0,
          y: 0,
        };
        this.isDragging = false;
      }

      static propTypes = {
        model: PropTypes.object.isRequired,
        htmlMode: PropTypes.string,
        processStyle: PropTypes.func,
        processAttr: PropTypes.func,
        // currentSelectedModel: PropTypes.instanceOf(WidgetBase), required ,but not used explicitly here
        setCurrentSelectedModel: PropTypes.func,
      }

      static styleText = config.style;
      static scriptFile = config.script;

      getProps() {
        const model = this.props.model;
        let processStyle = this.props.processStyle;
        const processAttr = this.props.processAttr || _.identity;
        if (!processStyle) {
          processStyle = this.props.htmlMode === 'preview' ? previewStyle : designStyle;
        }

        if (!this.isDragging) {
          const { left, top } = model.style;
          if (left) this.state.x = parseInt(left, 10);
          if (top) this.state.y = parseInt(top, 10);
        }

        let defaultStyle = {};
        if (this.isDraggable()) {
          defaultStyle = {
            top: this.state.y,
            left: this.state.x,
          };
        }
        if (model.selected) {
          defaultStyle.outline = '2px dashed #ccc';
        }
        const modelStyle = _.assign({}, model.style, defaultStyle);
        const designViewProps = [
          'htmlMode', 'processStyle',
          'processAttr', 'currentSelectedModel',
          'setCurrentSelectedModel',
        ];

        const otherProps = _.omit(this.props, designViewProps.concat('model'));
        otherProps.onClick = this.handleClick;
        if (this.props.htmlMode == 'design') {
          otherProps['data-show-view'] = 'design';
        }
        return {
          otherProps,
          id: model.attr.id || model.id, // attr id first
          style: processStyle(modelStyle, model),
          attr: processAttr(model.attr),
          dataAttr: getDataCustomAttr(model.attr),
          modelChildren: model.children.toJS(),
          designViewProps: _.pick(this.props, designViewProps),
          model: this.props.model,
          // model,
          // processStyle,
        };
      }

      handleDragEnd = () => {
        const model = this.props.model;
        this.isDragging = false;
        model.assignStyle({
          top: this.state.y,
          left: this.state.x,
        });
      }

      handleDragStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.isDragging = true;
      }

      handleDrag = (e, data) => {
        if (!this.isDraggable()) return;
        const { x, y } = this.state;
        this.setState({
          x: x + data.deltaX,
          y: y + data.deltaY,
        });
      }

      isDraggable() {
        const positionStyle = this.props.model.style.position;
        return (
          positionStyle === 'relative' || positionStyle === 'absolute' || positionStyle === 'fixed'
        ) && !this.props.model.notAllowDrag;
      }

      handleClick = (e) => {
        const currentDom = e.currentTarget;
        if (currentDom.getAttribute('data-show-view') === 'design') {
          e.stopPropagation();
          this.props.setCurrentSelectedModel(this.props.model);
        }
      }

      renderChild(childModel, props, index) {
        const viewType = childModel.viewType;
        const ShowComp = registerTable.getShowComp(viewType);
        return <ShowComp key={index} model={childModel} {...props.designViewProps} />;
      }

      render() {
        const props = this.getProps();
        const model = this.props.model;
        const composedComponent = (
          <ComposedComponent
            ref={dom => saveDomToGlobal(props.id, dom)}
            childrenList={props.modelChildren.map((childModel, index) => this.renderChild(childModel, props, index))}
            {...props}
            onClick={this.handleClick}
          />
        );

        if (model.notAllowWrap || this.props.htmlMode !== 'design') {
          return composedComponent;
        }
        const isDraggable = this.isDraggable();
        if (this.props.htmlMode == 'design' && model.selected && isDraggable) {
          return (
            <span>
              {composedComponent}
              <DraggableCore
                handle=".drag-handle"
                onDrag={this.handleDrag}
                onStart={this.handleDragStart}
                onStop={this.handleDragEnd}
              >
                <span className="select-model-drag-wrapper" ref={dom => this.dragContainer = dom}>
                  <div
                    className="drag-handle"
                    style={{
                      top: this.state.y,
                      left: this.state.x,
                    }}
                  >
                    <Icon type="bars" />
                  </div>
                </span>
              </DraggableCore>
            </span>
          );
        }
        return <span>{composedComponent}</span>;
      }
    }
    return ShowCompWrapper;
  };
}


const showViewPropTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  dataAttr: PropTypes.object.isRequired,
  modelChildren: PropTypes.array.isRequired,
  designViewProps: PropTypes.object.isRequired,
  otherProps: PropTypes.object,
  model: PropTypes.object.isRequired,
  childrenList: PropTypes.array.isRequired,
};

export default showView;
export { showViewPropTypes };
