import express from "express";
import cors from "cors";
import expressIp from "express-ip";
import routes from "./routers/index.js";

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors({ origin: "*" }));
server.use(express.json());
server.use(expressIp().getIpInfoMiddleware);
server.use(routes);

server.listen(PORT, () =>
  console.info(`Server listening at http://localhost:${PORT}`)
);

server.get("/api/coronavirus", async (req, res) => {
  await res.send({
    developer: "Jose Cueva Celis",
    linkedin: "https://www.linkedin.com/in/cuevacelis/",
  });
});

server.get("*", async (req, res) => {
  await res.sendStatus(404);
});
