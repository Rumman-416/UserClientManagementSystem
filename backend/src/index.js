const express = require("express");
const cors = require("cors");

const dotenv = require("./config");
const { connection } = require("./database/connection");
const routes = require("./routes");

const startServer = () => {
  const app = express();
  const PORT = dotenv.port;

  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  app.listen(PORT, () => {
    try {
      connection;
      console.log(`
        ################################################
        Server listening on port: http://localhost:${PORT} 
        ################################################
      `);
    } catch (error) {
      console.error(error);
    }
  });
};

startServer();
