const redis = require('redis');

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const client = redis.createClient({
  host: redisHost,
  port: redisPort,
});

// Need to fix
exports.GetItem = async (key) => {
  let data;
  await client.get(key, (err, reply) => {
    //console.log(reply);
    data = reply.toString();
  });
  return data;
};
