import React from 'react';
import { observer } from 'mobx-react';
// import registerTable from 'globals/registerTable';
import DesignComp from '../DesignComp';

@observer
class DesignPage extends React.Component {


  initMockModel = (mainContainer, modalListContainer, createModelInstanceWithId) => {
    window.mainContainer = mainContainer;
    const formModel = createModelInstanceWithId('form');
    const formInputContainer = formModel.formInputContainer;
    formInputContainer.assignStyle({
      margin: '20px 0',
      borderTop: '1px solid rgba(0,0,0,.2)',
      borderBottom: '1px solid rgba(0,0,0,.2)',
      padding: '0 10px',
    });

    const inputWrapper = formInputContainer
      .addInput().assignStyle({
        height: '44',
        lineHeight: '44',
        padding: '0 15px 0 45px',
        borderBottom: '1px solid rgba(0,0,0,.2)',
      });
    inputWrapper
      .label.assignStyle({
        position: 'absolute',
      });
    inputWrapper
      .input.assignAttr({
        field: 'mobile',
      }).assignStyle({
        height: 30,
        border: 'none',
      });
    // formInputContainer
    //   .addInput().assignAttr({
    //     field: 'yzm',
    //   });
    // formInputContainer
    //   .addInput().assignAttr({
    //     field: 'nick',
    //   });
    // formInputContainer
    // .addInput().assignAttr({
    //   field: 'password',
    // });

    mainContainer.push(formModel);
    // mainContainer.push(createModelInstanceWithId('modal'));
  }

  render() {
    return (
      <div className="design-page">
        <DesignComp
          initMockModel={this.initMockModel}
        />
      </div>
    );
  }
}

export default DesignPage;
