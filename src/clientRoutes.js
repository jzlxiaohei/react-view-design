import routeConfig from './routes';

// function loadPage(pageName) {
//   /* eslint-disable import/no-dynamic-require */
//   const pageBundle = require(`bundle-loader?name=pages/[path][name]&context=src/pages!./pages/${pageName}`);
//   return new Promise((resolve) => {
//     pageBundle(page => resolve(page.default || page));
//   });
// }

// const clientRoutes = routeConfig.map((route) => {
//   return {
//     fetchComponent() {
//       // return import(`./pages/${route.entryPath}.jsx`).then((component) => {
//       //   return component.default || component;
//       // });
//       return loadPage(route.entryPath);
//     },
//     ...route,
//   };
// });

// export default clientRoutes;
export default routeConfig;
