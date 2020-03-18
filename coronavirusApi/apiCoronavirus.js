"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _expressIp = _interopRequireDefault(require("express-ip"));

var _routers = _interopRequireDefault(require("./routers"));

var app = (0, _express["default"])();
var port = process.env.PORT || 5000;
app.use(_express["default"].json());
app.use((0, _expressIp["default"])().getIpInfoMiddleware);
app.use((0, _cors["default"])({
  origin: "*"
}));
app.use(_routers["default"]);
app.get("/api/coronavirus", function (req, res) {
  res.send({
    developer: "Jose Cueva Celis",
    linkedin: "https://www.linkedin.com/in/cuevacelis/"
  });
});
app.get("*", function (req, res) {
  res.sendStatus(404);
});
app.listen(port, function () {
  console.log("Ejecutandose en el puerto http://localhost:".concat(port));
});
//# sourceMappingURL=apiCoronavirus.js.map