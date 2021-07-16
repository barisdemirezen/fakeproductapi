import { promisify } from 'util';
import redis from 'redis';

const redisHost: string = String(process.env.REDIS_HOST);
const redisPort: number = Number(process.env.REDIS_PORT);
const redisDb: number = Number(process.env.REDIS_DB);

const client = redis.createClient({
  host: redisHost,
  port: redisPort,
  db: redisDb,
});

client.on('error', function (error) {
  console.error(error);
});

const getClientAsync = promisify(client.get).bind(client);

export const cache = {
  getAsync: async function (key: string) {
    const response: string = (await getClientAsync(key))!;
    if (response) {
      return JSON.parse(response);
    }
  },
  setAsync: async function (key: string, val: any, minute?: number) {
    client.set(key, JSON.stringify(val));
    if (minute != null) {
      //client.setex() can be used here but I found this way easier
      client.expire(key, minute * 60);
    }
  },
};
