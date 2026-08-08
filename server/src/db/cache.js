const { Redis } = require("ioredis");

const client = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 1,
  enableReadyCheck: true,
});

client.on("ready", () => console.log("Redis Ready"));
client.on("error", (err) => console.error(err.message));

module.exports = client;