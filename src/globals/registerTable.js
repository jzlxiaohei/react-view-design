import _ from 'lodash';

class RegisterTable {
  modelShowPairTable = {}
  editTable = {}

  idGenerator = {}

  clearIdGenerator(viewType) {
    if (viewType) {
      delete this.idGenerator[viewType];
    } else {
      this.idGenerator = {};
    }
  }

  initIdGenerator(idGenerator = {}) {
    this.idGenerator = idGenerator;
  }

  getIdGenerator() {
    return this.idGenerator;
  }

  generateId(viewType) {
    if (!(viewType in this.modelShowPairTable)) {
      throw new Error(`viewType: ${viewType} not found!`);
    }
    this.idGenerator[viewType] = this.idGenerator[viewType] || 1;
    return `${viewType}-${this.idGenerator[viewType]++}`;
  }

  clearTable() {
    this.modelShowPairTable = {};
  }

  clearEditTable() {
    this.editTable = {};
  }

  register(viewType, Model, ShowComp, { override = false, title = '', notAllowAdded } = {}) {
    const table = this.modelShowPairTable;
    if (viewType in table && !override) {
      throw new Error(`${viewType} has been existed! use '{ override: true }' if you want override`);
    }
    // Model.$ShowComp = ShowComp;
    table[viewType] = {
      Model,
      ShowComp,
      title: title || viewType,
      notAllowAdded,
    };
  }

  registerEdit(viewType, EditComp) {
    const table = this.modelShowPairTable;
    if (!(viewType in table)) {
      throw new Error(`model of ${viewType} no exist. pls register model first`);
    }
    this.editTable[viewType] = EditComp;
  }

  getViewTypes() {
    return Object.keys(this.modelShowPairTable);
  }

  getShowTable() {
    return this.modelShowPairTable;
  }

  _getShowConfig(viewType) {
    if (!(viewType in this.modelShowPairTable)) {
      throw new Error(`viewType: ${viewType} not found!`);
    }
    return this.modelShowPairTable[viewType];
  }

  getModel(viewType) {
    return this._getShowConfig(viewType).Model;
  }

  getShowComp(viewType) {
    return this._getShowConfig(viewType).ShowComp;
  }

  getEditComp(viewType) {
    // if (!(viewType in this.editTable)) {
    //   throw new Error(`viewType: ${viewType} not found!`);
    // }
    return this.editTable[viewType];
  }

  ensureId(viewType, id) {
    if (!viewType) throw new Error(`viewType required. got ${viewType}`);
    if (id && _.startsWith(id, `${viewType}-`)) {
      const idIndex = +id.replace(`${viewType}-`, '');
      this.idGenerator[viewType] = this.idGenerator[viewType] || 1;
      if (idIndex >= this.idGenerator[viewType]) {
        this.idGenerator[viewType] = idIndex + 1;
      }
    }
  }

  createModelInstance(viewType, id) {
    const Model = this.getModel(viewType);
    const instance = new Model();
    instance.viewType = viewType;
    // this.ensureId(viewType, id);
    if (id) {
      instance.setId(id);
    } else {
      instance.setId(this.generateId(viewType));
    }
    if (instance.initMethod) {
      instance.initMethod();
    }
    if (instance.isContainer && !instance.style.position) {
      instance.assignStyle({
        position: 'relative',
      });
    }
    return instance;
  }
}

const registerTable = new RegisterTable();
export default registerTable;
