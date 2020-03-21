const express    = require('express');
const bodyParser = require('body-parser');
const logger     = require('morgan');
const path       = require('path');
const cors       = require('cors');
const app        = express();
const CONFIG     = require('./config.json');

const PORT     = process.env.PORT || CONFIG.port;
const NODE_ENV = process.env.NODE_ENV || CONFIG.env;

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));

app.use('/', require(path.join(__dirname, 'router')));

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(
    `Web API Express Server started on Port ${app.get(
      'port'
    )} | Environment : ${app.get('env')}`
  );
});