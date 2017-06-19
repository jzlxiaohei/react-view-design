/* eslint-disable import/no-extraneous-dependencies, prefer-template */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

const resolve = path.resolve;
const devEnv = process.env.NODE_ENV !== 'production';
const devPort = 3027;

const mainEntry = devEnv ?
[
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:' + devPort,
  'webpack/hot/only-dev-server',
  './src/index.jsx',
] : ['./src/index.jsx'];

const commonPlugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/base.html',
    inject: 'body',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks(module) {
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(path.join(__dirname, 'src/pages')) < 0
      );
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['common'],
  }),
  new HappyPack({
    id: 'jsx',
    threads: 4,
    cache: true,
    loaders: ['babel-loader?cacheDirectory=true'],
  }),
  new webpack.DefinePlugin({
    __IS_NODE__: JSON.stringify(false),
  }),
];

const devPlugins = [
  // new DashboardPlugin(dashboard.setData),
  new webpack.HotModuleReplacementPlugin(), // enable HMR globally
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
];

const prodPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
    'module.hot': JSON.stringify(false),
    __IS_NODE__: JSON.stringify(false),
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: true },
  }),
];

module.exports = {
  entry: {
    main: mainEntry,
  },
  cache: true,
  output: {
    filename: devEnv ? '[name].js' : '[name].[chunkhash:8].js', // the output bundle

    path: resolve(__dirname, 'docs'),

    publicPath: '/',

    chunkFilename: devEnv ? '[name].js' : '[name].[chunkhash].js',
    libraryTarget: 'umd',
  },

  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    'react-addons-css-transition-group': {
      root: ['React', 'addons', 'CSSTransitionGroup'],
      commonjs: 'react-addons-css-transition-group',
      commonjs2: 'react-addons-css-transition-group',
      amd: 'react-addons-css-transition-group',
    },
    // antd: {
    //   root: 'antd',
    //   commonjs: 'antd',
    //   commonjs2: 'antd',
    //   amd: 'antd',
    // },
  },

  // context: resolve(__dirname, ''),

  devtool: devEnv ? '#cheap-module-eval-source-map' : '#source-map',
  // devtool: devEnv ? 'false' : '#source-map',

  devServer: {
    host: '0.0.0.0',

    hot: true, // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'), // match the output path

    historyApiFallback: true,

    publicPath: '/', // match the output `publicPath`

    port: devPort,

    disableHostCheck: true,

  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
      }, {
        test: /\.html$/,
        use: 'raw-loader',
        include: resolve(__dirname, 'src'),
      }, {
        test: /\.(js|jsx)$/,
        use: [
          'happypack/loader?id=jsx',
        ],
        include: resolve(__dirname, 'src'),
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },

  plugins: devEnv ? commonPlugins.concat(devPlugins)
                  : commonPlugins.concat(prodPlugins),
};
