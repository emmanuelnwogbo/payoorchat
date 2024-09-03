"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _http = _interopRequireDefault(require("http"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _waitlist = _interopRequireDefault(require("./waitlist.route"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
require('dotenv').config();
var app = (0, _express["default"])();
var server = _http["default"].createServer(app);
var PORT = process.env.PORT || 3031;
var WAITLIST_WEB_APP = _path["default"].join(__dirname, '../public/dist');
var corsOptions = {
  origin: ['https://www.payoor.shop', 'https://waitlist.payoor.shop', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};

// Middleware
app.use((0, _cors["default"])(corsOptions));
app.use(_express["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _cookieParser["default"])());

// Static file serving
app.use('/assets', _express["default"]["static"]('assets'));
app.use(_express["default"]["static"]('public/dist'));

// Routes
app.use('/api', _waitlist["default"]);
app.get('/', function (req, res) {
  var indexPath = _path["default"].join(WAITLIST_WEB_APP, 'index.html');
  res.sendFile(indexPath);
});

// Logging middleware
app.use(function (req, res, next) {
  console.log("".concat(req.method, " ").concat(req.url));
  next();
});

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// 404 handler
app.use(function (req, res) {
  res.status(404).json({
    error: 'Not Found'
  });
});

// Database connection and server start
_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  server.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
  });
})["catch"](function (error) {
  console.error('Error connecting to MongoDB:', error);
});
var _default = exports["default"] = app;