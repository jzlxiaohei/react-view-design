
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { useStrict } from 'mobx';
import { AppContainer } from 'react-hot-loader';
import simpleRouter from 'globals/simpleRouter';
import clientRoutes from './clientRoutes';
import './style/index.scss';

useStrict(true);

function main() {
  const rootEl = document.getElementById('root');
  function mountComponent(component) {
    ReactDOM.render((
      <AppContainer>
        {component}
      </AppContainer>
    ), rootEl);
  }

  function routeInit() {
    simpleRouter.destroy();
    simpleRouter.run(mountComponent, (err) => {
      let basicMessage = '404';
      if (_.isString(err)) {
        basicMessage = err;
      }
      if (err.message) {
        basicMessage = err.message;
      }
      const msgList = [basicMessage];
      if (err.stack) {
        msgList.push(err.stack);
      }
      mountComponent(
        <div>
          {msgList.map((msg, index) => <p key={index}>{msg}</p>)}
        </div>);
      throw err;
    });
  }

  simpleRouter.setRoutes(clientRoutes);
  routeInit();


  if (module.hot) {
    module.hot.accept('./clientRoutes', () => {
      /* eslint-disable global-require */
      const newRoutes = require('./clientRoutes').default;
      simpleRouter.setRoutes(newRoutes);
      routeInit();
    });
  }
}

main();

