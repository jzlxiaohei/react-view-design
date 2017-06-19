import React from 'react';
import { observer } from 'mobx-react';
// import registerTable from 'globals/registerTable';
import DesignComp from '../DesignComp';
import DesignModel from '../DesignModel';
import formDemoJson from '../../../server/designFiles/demo-form/design.json';

@observer
class DesignPage extends React.Component {


  constructor() {
    super();
    this.designModel = new DesignModel();
    this.designModel.setDesignId('demo-form');
    this.designModel.initModel(formDemoJson);
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
