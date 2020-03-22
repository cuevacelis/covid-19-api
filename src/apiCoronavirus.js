var compression = require('compression')
var express = require("express")
var cors = require("cors")
import routers from "./routers";
var expressIp = require("express-ip")
var app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(express.json());
app.use(expressIp().getIpInfoMiddleware);
app.use(cors({ origin: "*" }));
app.use(routers);

app.get("/api/coronavirus",async (req, res) => {
  await res.send({
    developer: "Jose Cueva Celis",
    linkedin: "https://www.linkedin.com/in/cuevacelis/",
  });
});

app.get("*",async (req, res) => {
  await res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Ejecutandose en el puerto http://localhost:${port}`);
});