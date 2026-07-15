const { Redis } = require("ioredis");

const client = new Redis(process.env.REDIS_URL);

client.on("connect", () => {
  console.log("Redis Connected");
});

client.on("error", (err) => {
  console.error("Redis Error:", err.message);
});

module.exports = client;