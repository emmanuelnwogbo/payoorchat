"use strict";

require("regenerator-runtime");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _waitlist = _interopRequireDefault(require("./waitlist.route"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3031;
var WAITLIST_WEB_APP = _path["default"].join(__dirname, '../public/dist');
//const assetsDirectory = path.join(__dirname, 'assets');

app.use('/assets', express["static"]('assets'));
app.use(express["static"]('public/dist'));
app.use((0, _cors["default"])(corsOptions));
app.use(express.json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])());
app.use(_waitlist["default"]);
app.get('/', function (req, res) {
  var indexPath = _path["default"].join(WAITLIST_WEB_APP, 'index.html');
  res.sendFile(indexPath);
});
var corsOptions = {
  origin: ['https://www.payoor.shop', 'https://waitlist.payoor.shop', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  server.listen(PORT, function (error) {
    if (error) {
      return console.error('Error starting server:', error);
    }
    console.log("Server started on port ".concat(PORT));
  });
})["catch"](function (error) {
  console.error('Error connecting to MongoDB:', error);
});