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

describe('GET /api/product', function () {
  it('Endpoint should return 200', async () => {
    const response = await request.get('/api/product');
    expect(response.status).toBe(200);
  });
  it('Api should return more than zero product', async () => {
    const response = await request.get('/api/product');
    expect(response.body.result.length).toBeGreaterThan(0);
  });
});
