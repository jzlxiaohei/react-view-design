// TODO: https://github.com/jzlxiaohei/react-simple-router

import SimpleRouter from './SimpleRouter';

function createRouter(history) {
  if (!history) {
    throw new Error('history must be provided first');
  }
  const sRouter = new SimpleRouter();
  sRouter.setHistory(history);
  return sRouter;
}

export default createRouter;
