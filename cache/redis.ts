import { promisify } from 'util';
import redis, { RedisClient, RetryStrategy } from 'redis';
const retryStrategy = require('node-redis-retry-strategy');

const redisHost: string = String(process.env.REDIS_HOST);
const redisPort: number = Number(process.env.REDIS_PORT);
const redisDb: number = Number(process.env.REDIS_DB);

var redisClient = (function () {
  // Start with a fake client so that we have a client that works
  // even when Redis server is down
  var client = {
    get: function (key: string, cb: any) {
      cb(null, null);
    },
    expire: function (key: string, time: number) {
      // Do nothing in particular
    },
    set: function (key: string, value: any) {
      // Empty
    },
  };

  // Attempt to create a new instance of an actual redis client
  let c = redis.createClient({
    host: redisHost,
    port: redisPort,
    db: redisDb,
    retry_strategy: retryStrategy({ allow_to_start_without_connection: true }),
  });

  // Set the "client" variable to the actual redis client instance
  // once a connection is established with the Redis server
  c.on('ready', function () {
    client = c;
  });

  /**
   * Get a redis client
   * @return {Object} client - eventually a proper redis client object (if redis is up) or a fake client object (if redis is down)
   */
  var getClient = function () {
    return client;
  };

  return {
    getClient: getClient,
  };
})();

const theClient = redisClient.getClient();
const getClientAsync = promisify(theClient.get).bind(redisClient);

export const cache = {
  getAsync: async function (key: string) {
    const response: any = (await getClientAsync(key))!;
    if (response) {
      return JSON.parse(response);
    }
  },
  setAsync: async function (key: string, val: any, minute?: number) {
    theClient.set(key, JSON.stringify(val));
    if (minute != null) {
      //client.setex() can be used here but I found this way easier
      theClient.expire(key, minute * 60);
    }
  },
};
