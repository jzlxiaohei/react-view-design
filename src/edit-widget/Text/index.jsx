import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { ModelText } from 'widget/Text';
import { FormInput } from 'comps/form';
import DefaultModelEdit from 'comps/defaultModelEdit';
import DefaultPropertyEdit from 'comps/defaultPropertyEdit';
import './index.scss';

@observer
class EditText extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ModelText).isRequired,
    onRemove: PropTypes.func,
  }

  convertTextToArray(value) {
    if (!value) return [''];
    return value.split('\n');
  }

  convertArrayToText(value) {
    return value.join('\n');
  }

  render() {
    const model = this.props.model;
    return (
      <div className="edit-text">
        <DefaultModelEdit model={model} onRemove={this.props.onRemove} />
        <FormInput
          type="textarea"
          autosize={{ minRows: 2, maxRows: 2 }}
          label="文本" model={model} path="attr.content"
          valueControlToModel={this.convertTextToArray}
          valueModelToControl={this.convertArrayToText}
        />
        <DefaultPropertyEdit model={model} ignoreFileds={{ attr: ['content'] }} />
      </div>
    );
  }
}

export default EditText;
