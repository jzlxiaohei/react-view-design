import createRouter from 'infra/ss-router';
import history from './history';

const simpleRouter = createRouter(history);
const Link = simpleRouter.Link;

export default simpleRouter;
export { Link };
