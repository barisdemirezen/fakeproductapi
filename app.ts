require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import { server } from './server';

const app = server.server();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

const dbUsername: string = String(process.env.DB_USERNAME);
const dbPassword: string = String(process.env.DB_PASSWORD);
const dbName: string = String(process.env.DB_DATABASE);
const appPort: number = Number(process.env.PORT);

const uri: string = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.uttnk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// @ts-ignore
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(appPort || 8001);
