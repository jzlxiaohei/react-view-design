const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const qiniu = require('qiniu');
const config = require('./config.json');
const initApiRouter = require('./apiRouters');

const app = new Express();
const apiServer = new Express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

global.$asyncWrapper = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

const bucket = config.bucket;
qiniu.conf.ACCESS_KEY = config.access_key;
qiniu.conf.SECRET_KEY = config.secret_key;

function uptoken() {
  const putPolicy = new qiniu.rs.PutPolicy(bucket);
  return putPolicy.token();
}

apiServer.get('/uptoken', (req, res) => {
  res.json({
    uptoken: uptoken(),
  });
});

app.use('/api', apiServer);
initApiRouter(apiServer);

app.listen(config.port, () => {
  console.log('run on:' + config.port);
});

