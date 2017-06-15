import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Spin } from 'antd';
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


  render() {
    return (
      <div>
        {
          this.designList.$loading ? <Spin>loading..</Spin> :
          this.designList.list.map((designId) => (
            <div key={designId}>
              <Link to={`/design?designId=${designId}`}>{designId}</Link>
            </div>
          ))
        }
      </div>
    );
  }
}

export default DesignListPage;
