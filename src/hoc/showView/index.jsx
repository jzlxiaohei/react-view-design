import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observe } from 'mobx';
import { Icon } from 'antd';
import _ from 'lodash';
import { DraggableCore } from 'react-draggable';
import { appendPx, px2rem } from 'utils/processStyle';
import getDataCustomAttr from 'utils/getDataCustomAttr';
import './index.scss';

function designStyle(style) {
  return appendPx(style);
}

function previewStyle(style) {
  return px2rem(appendPx(style));
}

function showView(config = {}) {
  return (ComposedComponent) => {
    @observer
    class ShowCompWrapper extends React.PureComponent {

      constructor(props) {
        super(props);
        this.state = {
          x: 0, y: 0,
        };
      }

      static propTypes = {
        model: PropTypes.object.isRequired,
        htmlMode: PropTypes.string,
        processStyle: PropTypes.func,
        processAttr: PropTypes.func,
      }

      static styleText = config.style;

      componentDidMount() {
        if (this.props.htmlMode !== 'design') return;

        this.disposerForObs = observe(
          this.props.model,
          'style',
          (change) => {
            const newPos = change.newValue.position;
            const oldPos = change.oldValue.position;
            if (newPos == oldPos) return;
            if (newPos == 'absolute') {
              const { left, top } = this.dragContainer.getBoundingClientRect();
              this.setState({
                x: left,
                y: top,
              });
            }
            if (oldPos == 'absolute') {
              this.setState({
                x: 0,
                y: 0,
              });
            }
          },
        );
      }

      componentWillUnmount() {
        if (this.disposerForObs) {
          this.disposerForObs();
        }
      }


      getProps() {
        const model = this.props.model;
        let processStyle = this.props.processStyle;
        const processAttr = this.props.processAttr || _.identity;
        if (!processStyle) {
          processStyle = this.props.htmlMode === 'preview' ? previewStyle : designStyle;
        }

        let defaultStyle = {};
        if (this.isDraggable) {
          defaultStyle = {
            top: this.state.y,
            left: this.state.x,
          };
        }
        const modelStyle = _.assign({}, model.style, defaultStyle);
        const showViewProps = ['htmlMode', 'processStyle', 'processAttr'];

        return {
          otherProps: _.omit(this.props, showViewProps.concat('model')),
          id: model.attr.id || model.id, // attr id first
          style: processStyle(modelStyle, model),
          attr: processAttr(model.attr),
          dataAttr: getDataCustomAttr(model.attr),
          modelChildren: model.children.toJS(),
          showViewProps: _.pick(this.props, showViewProps),
          // model,
          // processStyle,
        };
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
        return (positionStyle === 'relative' || positionStyle === 'absolute');
      }

      render() {
        const props = this.getProps();
        const model = this.props.model;
        if (this.props.htmlMode == 'design' && model.selected && this.isDraggable()) {
          return (
            <DraggableCore
              handle=".drag-handle"
              onDrag={this.handleDrag}
            >
              <div className="select-model-drag-wrapper" ref={dom => this.dragContainer = dom} >
                <div
                  className="drag-handle"
                  style={{
                    top: this.state.y,
                    left: this.state.x,
                  }}
                >
                  <Icon type="bars" />
                </div>
                <ComposedComponent {...props} />
              </div>
            </DraggableCore>
          );
        }
        return <ComposedComponent {...props} />;
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
  showViewProps: PropTypes.object.isRequired,
  otherProps: PropTypes.object,
};

export default showView;
export { showViewPropTypes };
