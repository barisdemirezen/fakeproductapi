const express = require('express');

const productRouter = require('./routes/product');
const guideRouter = require('./routes/guide');

function server() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/product', productRouter);
  app.use('/', guideRouter);
  return app;
}

module.exports = server;
