import React from 'react';
import { observer } from 'mobx-react';
// import registerTable from 'globals/registerTable';
import DesignComp from '../DesignComp';
import DesignModel from '../DesignModel';

@observer
class DesignPage extends React.Component {


  constructor() {
    super();
    this.designModel = new DesignModel();
    this.designModel.setDesignId('demo-form');
  }

  componentDidMount() {
    this.designModel.fetch();
  }

  render() {
    return (
      <div className="design-page">
        <DesignComp
          designModel={this.designModel}
        />
      </div>
    );
  }
}

export default DesignPage;
