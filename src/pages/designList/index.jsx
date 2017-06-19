import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Spin, Button, message } from 'antd';
import { Link } from 'globals/simpleRouter';
import DesignList from './DesignList';

@observer
class DesignListPage extends React.Component {

  static propTypes = {
    designList: PropTypes.instanceOf(DesignList).isRequired,
  }

  constructor(props) {
    super(props);
    this.designList = props.designList || new DesignList();
  }

  componentDidMount() {
    this.designList.fetch();
  }

  handelBuildHtml = (designId) => {
    this.designList.buildHtml(designId)
    .then(() => {
      message.success('保存成功');
    })
    .catch(() => {
      message.error('保存失败');
    });
  }

  render() {
    return (
      <div>
        <Link className="mr-10" to="/design">simple</Link>
        <Link className="mr-10" to="/demo-form">form</Link>
      </div>
    );
  }
}

export default DesignListPage;
