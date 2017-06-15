import React from 'react';
import showView, { showViewPropTypes } from 'hoc/showView';

@showView()
class ShowLink extends React.Component {

  static propTypes = {
    // model: PropTypes.instanceOf(Picture),
    ...showViewPropTypes,
  }

  handelClick = (e) => {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    const props = this.props;
    const { attr } = props;
    // const otherProps = props.otherProps;
    // if (this.props.designViewProps.htmlModel == 'design') {
    //   otherProps.target = '__blank';
    // }
    return (
      <a
        className="comp_show-link"
        {...props.otherProps}
        style={props.style}
        id={props.id}
        {...props.dataAttr}
        href={attr.link}
        onClick={this.handelClick}
      >
        {props.childrenList.length > 0 ?
          props.childrenList :
          <span className="danger-action">请从编辑面板中添加内容</span>}
      </a>
    );
  }
}

export default ShowLink;
