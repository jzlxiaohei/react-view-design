import { action } from 'mobx';
import registerTable from 'globals/registerTable';
import WidgetBase from '../WidgetBase';

// class FormInput extends WidgetBase {

//   constructor() {
//     super();
//     this.isContainer = false;
//   }

//   initAttrConfig() {
//     return {
//       placeholder: { value: '', title: '占位文字' },
//       field: { value: '', title: '字段 *' },
//       type: {
//         title: '类型',
//         value: 'text',
//         options: [
//           { value: 'text', text: '单行文本' },
//           { value: 'textarea', text: '多行文本' }, // number, tel, date等考虑有支持的必要吗
//         ],
//       },
//     };
//   }

//   initStyleConfig() {
//     return {
//       WebkitAppearance: { value: 'none' },
//       minHeight: { value: '' },
//       border: { value: 'none' },
//     };
//   }
// }

class FormLabel extends WidgetBase {

  constructor() {
    super();
    this.isContainer = false;
  }

  initAttrConfig() {
    return {
      text: { value: '标签文本' },
    };
  }
  initStyleConfig() {
    return {
      // width: { value: '48' },
      display: { value: 'inline-block' },
      minHeight: { value: '' },
    };
  }
}

class FormInputItemWrapper extends WidgetBase {

  // push() {
  //   throw new Error('should not invoke push method of FormInput');
  // }

  // remove() {
  //   throw new Error('should not invoke remove method of FormInput');
  // }

  // removeByIndex() {
  //   throw new Error('should not invoke removeByIndex method of FormInput');
  // }

  _initChild(viewType, Ctor) {
    const item = new Ctor();
    const id = registerTable.generateId(viewType);
    item.setId(id);
    item.viewType = viewType;
    super.push(item);
    return item;
  }

  @action
  initChildren() {
    // this.children = [];
    this.label = this._initChild('local-form-label', FormLabel);
    this.input = this._initChild('input', FormLabel);
  }

  initAttrConfig() {
    return {
    };
  }

  initStyleConfig() {
    return {
      minHeight: { value: '' },
    };
  }

  // initByJSON(data = {}) {
  //   _.assign(this, _.omit(data, 'children'));
  //   const children = data.children;

  //   const label = new Label();
  //   label.initByJSON(children[0]);
  //   label.parentContainer = this;

  //   const input = new Input();
  //   input.initByJSON(children[1]);
  //   input.parentContainer = this;
  //   this.children = [label, input];
  // }
}

class FormInputContainer extends WidgetBase {

  createInput() {
    const input = new FormInputItemWrapper();
    const viewType = 'local-form-item-wrapper';
    const id = registerTable.generateId(viewType);
    input.setId(id);
    input.viewType = viewType;
    input.initChildren();
    return input;
  }

  push(child) {
    // if (!(child instanceof FormInputWrapper)) {
    //   throw new Error('use createInput(), then pass to push function ');
    // }
    super.push(child);
  }

  addInput() {
    const input = this.createInput();
    super.push(input);
    return input;
  }

  initAttrConfig() {
    return {
    };
  }

  initStyleConfig() {
    return {
      minHeight: { value: '' },
    };
  }

  // @action
  // initByJSON(data = {}) {
  //   _.assign(this, _.omit(data, 'children'));
  //   const children = data.children;
  //   this.children = children.map(childJSON => {
  //     const childModel = FormInputWrapper();
  //     childModel.initByJSON(childJSON);
  //     return childModel;
  //   });
  // }

}

class FormWidget extends WidgetBase {

  initAttrConfig() {
    return {
      apiUrl: { title: '请求地址' },
      method: {
        title: '请求方法',
        value: 'post',
        options: [
          { value: 'post' },
          { value: 'put' },
        ],
      },
    };
  }

  initMethod() {
    const formInputContainer = new FormInputContainer();
    formInputContainer.viewType = 'local-form-item-container';
    formInputContainer.id = registerTable.generateId(formInputContainer.viewType);
    super.push(formInputContainer);
    const submitButton = registerTable.createModelInstance('button');
    submitButton.id = `${this.id}-submit-button`;
    super.push(submitButton);

    // this.formInputContainer = formInputContainer;
    // this.submitButton = submitButton;
  }

  // @action
  // initByJSON(data = {}) {
  //   _.assign(this, _.omit(data, 'children'));
  //   const children = data.children;
  //   this.children = children.map(childJSON => {
  //     const childModel = FormInputContainer();
  //     childModel.initByJSON(childJSON);
  //     return childModel;
  //   });
  // }

}

export default FormWidget;
export {
  FormInputContainer,
  FormInputItemWrapper,
  FormLabel,
  // FormInput,
};
