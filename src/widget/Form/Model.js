import WidgetBase from '../WidgetBase';

class Input extends WidgetBase {

  initAttrConfig() {
    return {
      field: { value: '', title: '字段 *' },
      apiUrl: { title: '请求地址' },
      label: { title: '标签', value: '标签' },
      type: {
        title: '类型',
        value: '',
        options: [
          { value: 'text', text: '单行文本' },
          { value: 'textarea', text: '多行文本' }, // number, tel, date等考虑有支持的必要吗
        ],
      },
    };
  }
}

class FormWidget extends WidgetBase {

  idSeq = 1;


  initAttrConfig() {
    return {
      apiUrl: { title: '请求地址' },
    };
  }

  createInput() {
    const input = new Input();
    input.setId(`${this.id}-input-${this.idSeq++}`);
    input.viewType = 'input';
    return input;
  }

  push(child) {
    if (!(child instanceof Input)) {
      throw new Error('use createInput(), then pass to push function ');
    }
    super.push(child);
  }

  addInput() {
    const input = this.createInput();
    this.push(input);
    return input;
  }

}

export default FormWidget;
