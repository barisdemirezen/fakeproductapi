require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const server = require('./server');

const app = server();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;
const appPort = process.env.PORT;

const dbURL = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.uttnk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connection succesfully'))
  .catch((err) => console.log(err + 'connection failed'));

app.listen(appPort || 8001);
