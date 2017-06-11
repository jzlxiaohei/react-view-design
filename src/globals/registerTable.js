// let modelShowPairTable = {};
// let editTable = {};


// not sure it is singleton
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

  initIdGenerator(idGenerator) {
    this.idGenerator = idGenerator;
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

  createModelInstance(viewType, id) {
    const Model = this.getModel(viewType);
    const instance = new Model();
    instance.viewType = viewType;
    if (id) {
      instance.setId(id);
    } else {
      instance.setId(this.generateId(viewType));
    }
    if (instance.initMethod) {
      instance.initMethod();
    }
    return instance;
  }
}


export default new RegisterTable();
