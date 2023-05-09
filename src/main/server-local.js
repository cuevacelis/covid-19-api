require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const expressIp = require("express-ip");
const { myCacheMiddleware } = require("../middleware/cache-middleware.js");
const routes = require("../routers/index.js");
const server = express();
const PORT = process.env.PORT || 3000;

server.use(cors({ origin: "*" }));
server.use(express.json());
server.use(expressIp().getIpInfoMiddleware);
server.use(myCacheMiddleware);
server.use("/", routes); // path must route to lambda

server.listen(PORT, () =>
  console.info(`Server listening at http://localhost:${PORT}`)
);

module.exports = server;
module.exports.handler = serverless(server);
