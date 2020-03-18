"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _quick = _interopRequireDefault(require("quick.db"));

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var corona = new _quick["default"].table("corona");

var getTotal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var response, total, html, numbers, i, number;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios["default"].get("https://www.worldometers.info/coronavirus/");

          case 3:
            response = _context.sent;

            if (response.status !== 200) {
              console.log("ERROR");
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 10:
            total = {
              cases: null,
              deaths: null,
              recovered: null
            };
            html = _cheerio["default"].load(response.data);
            numbers = html(".maincounter-number");

            for (i = 0; i < numbers.length; i++) {
              number = (0, _cheerio["default"])(numbers[i]).children("span").text().trim();
              total[Object.keys(total)[i]] = number;
            }

            corona.set("total", total);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getTotal() {
    return _ref.apply(this, arguments);
  };
}();

var getCountries = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var response, html, table, headingsNodes, rowsNodes, names, matchName, headings, countries, i, _i, cells, country, o, value;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _axios["default"].get("https://www.worldometers.info/coronavirus/");

          case 3:
            response = _context2.sent;

            if (response.status !== 200) {
              console.log("Error", response.status);
            }

            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", null);

          case 10:
            html = _cheerio["default"].load(response.data);
            table = html("table#main_table_countries");
            headingsNodes = table.children("thead").find("th");
            rowsNodes = table.children("tbody").children("tr");
            names = {
              Country: "country",
              TotalCases: "total",
              NewCases: "newCases",
              TotalDeaths: "totalDeaths",
              NewDeaths: "newDeaths",
              TotalRecovered: "totalRecovered",
              ActiveCases: "activeCases",
              Serious: "serious"
            };

            matchName = function matchName(name) {
              return names[name] || name;
            };

            headings = [];
            countries = [];

            for (i = 0; i < headingsNodes.length; i++) {
              headings.push(matchName((0, _cheerio["default"])(headingsNodes[i]).text().split(",")[0]));
            }

            for (_i = 0; _i < rowsNodes.length - 1; _i++) {
              cells = (0, _cheerio["default"])(rowsNodes[_i]).children("td");
              country = {};

              for (o = 0; o < cells.length; o++) {
                value = (0, _cheerio["default"])(cells[o]).text().trim();
                country = _objectSpread({}, country, (0, _defineProperty2["default"])({}, headings[o], value.length ? value : 0));
              }

              countries.push(country);
            }

            corona.set("countries", countries);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getCountries() {
    return _ref2.apply(this, arguments);
  };
}();

setInterval(function () {
  getCountries();
  getTotal();
}, 10000);
var _default = corona;
exports["default"] = _default;
//# sourceMappingURL=index.js.map