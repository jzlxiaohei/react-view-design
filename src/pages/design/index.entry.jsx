import React from 'react';
// import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import registerTable from 'globals/registerTable';
import DesignModel from '../DesignModel';
import DesignComp from '../DesignComp';
import c499Json from '../../../server/designFiles/c_499/design.json';

@observer
class DesignPage extends React.Component {

  static propTypes = {
    // location: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.designModel = new DesignModel();
    this.designModel.setDesignId('c_499');
    this.designModel.initModel(c499Json);
  }

  componentDidMount() {
    // const designId = this.props.location.query.designId;
    // if (designId) {
    //   this.designModel.setDesignId(designId);
    //   this.designModel.fetch();
    // }
  }

  render() {
    return (
      <div className="design-page">
        <DesignComp designModel={this.designModel} />
      </div>
    );
  }
}

export default DesignPage;
