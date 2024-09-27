const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("Missing required MONGO_URI environment variable");
}

module.exports = { port, mongoUri };
