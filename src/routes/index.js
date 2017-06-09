// import Home from 'pages/'
// import Layout from '../layout/Layout';
// import Home from '../pages/home';
import Design from '../pages/design/index.entry';
import DemoForm from '../pages/demo/form.entry'

export default [
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
