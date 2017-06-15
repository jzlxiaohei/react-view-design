import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
// import registerTable from 'globals/registerTable';
import DesignModel from '../DesignModel';
import DesignComp from '../DesignComp';

@observer
class DesignPage extends React.Component {


  initMockModel = (mainContainer, modalListContainer, createModelInstanceWithId) => {
    mainContainer.assignStyle({
      background: '#FDD100',
    });
    const pic1 = mainContainer.push(createModelInstanceWithId('picture'));
    pic1.assignAttr({
      url: '//cdn.llsapp.com/hybrid/tydus-banner/assets/cc_with_comment_top.gif',
    });
    const pic2 = mainContainer.push(createModelInstanceWithId('picture'));
    pic2.assignAttr({
      url: '//cdn.llscdn.com/fe-static/lingome/499-part-1-OEH9HoHx.jpg',
    });

    mainContainer.push(
      createModelInstanceWithId('picture')
        .assignAttr({
          url: '//cdn.llscdn.com/fe-static/lingome/499-part-2-xDHxZodh.jpg',
        })
        .assignStyle({
          marginTop: '30',
        }),
    );

    mainContainer.push(
      createModelInstanceWithId('picture')
        .assignAttr({
          url: '//cdn.llscdn.com/fe-static/lingome/499-part-3-cL3xo5ia.jpg',
        })
        .assignStyle({
          marginTop: '30',
        }),
    );


    const swipeModel = mainContainer.push(createModelInstanceWithId('swipe'));
    swipeModel.assignStyle({
      width: 320,
      margin: '0 auto',
      padding: '0 10',
    });
    swipeModel.addSlide().push(
      createModelInstanceWithId('picture').assignAttr({
        url: '//cdn.llscdn.com/fe-static/lingome/Mark退款学员-BAZIvKM6.png?imageView2/0/w/828',
      }).assignStyle({
        width: 300,
      }),
    );
    swipeModel.addSlide().push(
      createModelInstanceWithId('picture').assignAttr({
        url: '//cdn.llscdn.com/fe-static/lingome/Cherry 退款学员-81ybwPX5.png?imageView2/0/w/828',
      }).assignStyle({
        width: 300,
      }),
    );
    swipeModel.addSlide().push(
      createModelInstanceWithId('picture').assignAttr({
        url: '//cdn.llscdn.com/fe-static/lingome/未生 退款学员-yQF2gjwP.png?imageView2/0/w/828',
      }).assignStyle({
        width: 300,
      }),
    );

    // mainContainer.push(createModelInstanceWithId('modal'));
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.designModel = new DesignModel();
  }

  componentDidMount() {
    const designId = this.props.location.query.designId;
    this.designModel.setDesignId(designId);
    this.designModel.fetch();
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
