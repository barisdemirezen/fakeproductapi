require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//  const redis = require('redis');
const productRouter = require('./routes/product');
const guideRouter = require('./routes/guide');
const app = express();

app.set('view engine','pug');
app.set('views', './views');


const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;
//  const redisHost = process.env.REDIS_HOST;
//  const redisPort = process.env.REDIS_PORT;
const appPort = process.env.APP_PORT;

/*
client.on('error', (error) => {
  console.error(error);
});
*/

const dbURL = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.uttnk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connection succesfully'))
  .catch(() => console.log('connection failed'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/product', productRouter);
app.use('/', guideRouter);

app.listen(appPort, () => {
  console.log(`Listening for ${appPort}`);
});
