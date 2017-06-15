// import Home from 'pages/'
// import Layout from '../layout/Layout';
// import Home from '../pages/home';
import Design from '../pages/design/index.entry';
import DesignList from '../pages/designList';
import DemoForm from '../pages/demo/form.entry';

export default [
  {
    path: '/',
    // container: Layout,
    component: DesignList,
  },
  {
    path: '/design',
    // container: Layout,
    component: Design,
  },
  {
    path: '/demo-form',
    component: DemoForm,
  },
];
