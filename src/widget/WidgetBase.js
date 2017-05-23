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
  getDefaultStyleConfig() {
    return {
      width: { value: 375 },
      height: { value: 100 },
      color: { type: 'color', title: '字体颜色' },
    };
  }

  @action
  init() {
    if (!this.initAttrConfig) throw new Error('initAttrConfig method is required');
    this.attrConfig = this.initAttrConfig();
    this.styleConfig = this.initStyleConfig ? this.initStyleConfig() : this.getDefaultStyleConfig();
    const style = this.getDefaultValueByConfig(this.styleConfig);
    const attr = this.getDefaultValueByConfig(this.attrConfig);
    attr.id = attr.id || this.id;
    this.assignStyle(style);
    this.assignAttr(attr);
  }

  @action
  getDefaultValueByConfig(config) {
    const result = {};
    const keys = _.keys(config);
    keys.forEach(key => {
      result[key] = config[key].value || '';
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

  @action
  assignStyle(style) {
    this.style = _.assign({}, this.style, style);
  }

  @action
  assignAttr(attr) {
    this.attr = _.assign({}, this.attr, attr);
  }

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
