import React from 'react';
import registerTable from 'globals/registerTable';
import showView, { showViewPropTypes } from 'hoc/showView';
import style from './style.scss';
import { CompContainer } from '../Container';

@showView({ style })
class ShowModal extends React.Component {

  static propTypes = {
    // model: PropTypes.instanceOf(Picture),
    ...showViewPropTypes,
  }

  render() {
    const props = this.props;
    return (
      <div
        className="comp_show-modal"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
      >
        <CompContainer model={props.model.contentWrapper} {...this.props.showViewProps} />
      </div>
    );
  }
}

export default ShowModal;
