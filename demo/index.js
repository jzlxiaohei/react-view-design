global.__IS_NODE__ = true;

require('babel-core/register');
require('babel-polyfill');
require('../server/require-hook');
require('./demo');

