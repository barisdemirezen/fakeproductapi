require('dotenv').config();
const server = require('../../server');
const supertest = require('supertest');
const { afterAll } = require('@jest/globals');
const request = supertest(server());
const mongoose = require('mongoose');

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;

const dbURL = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.uttnk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

beforeAll((done) => {
  mongoose.connect(
    dbURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done(),
  );
});

afterAll((done) => {
  mongoose.connection.close(() => done());
});

describe('Mongo Connection', function () {
  it('Mongo connection should return 1', async () => {
    const mongoState = mongoose.connection.readyState;
    expect(mongoState).toBe(1);
  });
});
