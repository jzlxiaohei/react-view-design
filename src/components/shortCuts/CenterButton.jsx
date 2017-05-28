import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import WidgetBase from 'widget/WidgetBase';

@observer
class CenterButton extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBase),
  }

  handleClick = () => {
    this.props.model.assignStyle({
      marginLeft: 'auto',
      marginRight: 'auto',
    });
  }

  render() {
    return <Button onClick={this.handleClick}>左右居中</Button>;
  }

}
export default CenterButton;
