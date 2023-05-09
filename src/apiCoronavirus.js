const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const expressIp = require("express-ip");
const routes = require("./routers/index.js");
const { myCacheMiddleware } = require("./middleware/cache-middleware.js");
const server = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

server.use(cors({ origin: "*" }));
server.use(express.json());
server.use(expressIp().getIpInfoMiddleware);
server.use(myCacheMiddleware);
server.use(bodyParser);
server.use("/.netlify/functions/server", router); // path must route to lambda
server.use(routes);

server.get("/api/coronavirus", async (req, res) => {
  await res.send({
    developer: "Jose Cueva Celis",
    linkedin: "https://www.linkedin.com/in/cuevacelis/",
  });
});

server.get("*", async (req, res) => {
  await res.sendStatus(404);
});

server.listen(PORT, () =>
  console.info(`Server listening at http://localhost:${PORT}`)
);

module.exports = server;
module.exports.handler = serverless(server);
