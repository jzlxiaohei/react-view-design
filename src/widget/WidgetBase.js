import { extendObservable, action, toJS } from 'mobx';
import _ from 'lodash';


function getMethodImplementString(method) {
  return `subClass of Base should implement its own ${method} method`;
}

class WidgetBase {
  constructor() {
    extendObservable(this, {
      id: '', // auto injected
      style: {},
      attr: {},
      attrConfig: '',
      styleConfig: '',
      selected: false,
      children: [],
      isContainer: true,
      parentContainer: null,
    });
    this.init();
  }

  /**
   * { title: 'label', type: 'color|text|number', value: ''}
   */
  getCommonStyleConfig() {
    return {
      width: { value: 375 },
      minHeight: { value: 100 },
      color: { type: 'color', title: '字体颜色' },
      position: {
        title: '位置模式',
        options: [
          { value: 'relative', text: 'relative(占位拖拽)' },
          { value: 'absolute', text: 'absolute(不占位拖拽)' },
          { value: 'fixed', text: 'fixed(相对于视窗移动)' },
        ],
      },
    };
  }

  getCommonAttrConfig() {
    return {
      id: { title: '自定义ID(谨慎更改)' },
    };
  }

  getDomId() {
    return this.attr.id || this.id;
  }

  @action
  init() {
    if (!this.initAttrConfig) throw new Error('initAttrConfig method is required');
    this.attrConfig = _.assign(
      this.getCommonAttrConfig(),
      this.initAttrConfig(),
    );
    this.styleConfig = _.assign(
      this.getCommonStyleConfig(),
      this.initStyleConfig ? this.initStyleConfig() : {},
    );
    const style = this.getDefaultValueByConfig(this.styleConfig);
    const attr = {};
    attr.id = attr.id || this.id;
    _.assign(attr, this.getDefaultValueByConfig(this.attrConfig));
    this.assignStyle(style);
    this.assignAttr(attr);
  }

  @action
  getDefaultValueByConfig(config) {
    const result = {};
    const keys = _.keys(config);
    keys.forEach(key => {
      result[key] = ('value' in config[key]) ? config[key].value : '';
    });
    return result;
  }

  @action
  setSelected = (value) => {
    this.selected = value;
  };

  @action
  push(child) {
    if (!(child instanceof WidgetBase)) {
      throw new Error('child must be subClass of WidgetBase');
    }
    child.parentContainer = this; // eslint-disable-line no-param-reassign
    this.children.push(child);
    return child;
  }

  @action
  insertBefore(newChild, model) {
    if (!(newChild instanceof WidgetBase)) {
      throw new Error('child must be subClass of WidgetBase');
    }
    newChild.parentContainer = this; // eslint-disable-line no-param-reassign
    const index = _.findIndex(this.children, model);
    if (newChild.parentContainer == model.parentContainer) {
      this.remove(newChild);
    }
    this.children.splice(index, 0, newChild);
    return newChild;
  }

  @action
  removeByIndex(index) {
    this.children.splice(index, 1);
  }

  @action
  remove(model) {
    const index = _.findIndex(this.children, model);
    if (index !== -1) {
      this.removeByIndex(index);
    }
  }

  getAttrConfig() {
    throw new Error(getMethodImplementString('getDefaultAttr'));
  }

  getValue() {
    const viewType = this.viewType;
    if (!viewType) {
      throw new Error('model must have viewType');
    }
    return {
      viewType,
      attr: toJS(this.attr),
      style: toJS(this.style),
      id: this.id,
      selected: this.selected,
    };
  }

  removeStyle = action((key) => {
    if (!key) {
      throw new Error('removeStyle: single key must be provided');
    }
    this.style = _.omit(this.style, key);
  })


  removeAttr = action((key) => {
    if (!key) {
      throw new Error('removeAttr: single key must be provided');
    }
    this.attr = _.omit(this.attr, key);
  })

  assignStyle = action((style) => {
    this.style = _.assign({}, this.style, style);
    return this;
  })

  assignAttr = action((attr) => {
    this.attr = _.assign({}, this.attr, attr);
    return this;
  })

  @action
  setStyle(style) {
    this.style = style;
  }

  @action
  setAttr(attr) {
    this.attr = attr;
  }

  @action
  setId(id) {
    this.id = id;
  }

  @action
  initByJSON(data = {}) {
    _.assign(this, data);
  }

  getJSON() {
    const viewType = this.viewType;
    if (!viewType) {
      throw new Error('model must have viewType');
    }
    return {
      viewType,
      attr: toJS(this.attr),
      style: toJS(this.style),
      id: this.id,
      selected: this.selected,
    };
  }

}

export default WidgetBase;
