"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("regenerator-runtime");
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _fs = _interopRequireDefault(require("fs"));
var _validatePhoneNumber = _interopRequireDefault(require("./services/payoor/validatePhoneNumber"));
var _generateJWT = _interopRequireDefault(require("./services/payoor/generateJWT"));
var _saveMessage = _interopRequireDefault(require("./services/payoor/saveMessage"));
var _saveUserName = _interopRequireDefault(require("./services/payoor/saveUserName"));
var _getValidUser = _interopRequireDefault(require("./services/payoor/getValidUser"));
var _sanitizeId = _interopRequireDefault(require("./services/payoor/sanitizeId"));
var _toggleOnlineState = _interopRequireDefault(require("./services/payoor/toggleOnlineState"));
var _createRoom = _interopRequireDefault(require("./services/payoor/createRoom"));
var _joinRoom = _interopRequireDefault(require("./services/payoor/joinRoom"));
var _verifyToken = _interopRequireDefault(require("./services/payoor/verifyToken"));
var _file = _interopRequireDefault(require("./models/file"));
var _userRoute = _interopRequireDefault(require("./routes/userRoute"));
var _conversationRoute = _interopRequireDefault(require("./routes/conversationRoute"));
var _createVerification = _interopRequireDefault(require("./services/twilio/createVerification"));
var _createVerificationCheck = _interopRequireDefault(require("./services/twilio/createVerificationCheck"));
var _createVerification2 = _interopRequireDefault(require("./services/payoor/test/createVerification"));
var _createVerificationCheck2 = _interopRequireDefault(require("./services/payoor/test/createVerificationCheck"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var crypto = require('crypto');
var corsOrginArray = ['http://localhost:3000', 'https://dfa1-149-22-81-214.ngrok-free.app', 'https://chat.payoor.shop', "http://localhost:49192"];
var io = require('socket.io')(server, {
  cors: {
    origin: corsOrginArray,
    methods: ["GET", "POST"]
  }
});
//import createService from './services/twilio/createService';
//createService();

var corsOptions = {
  origin: corsOrginArray,
  optionsSuccessStatus: 200
};
app.use((0, _cors["default"])(corsOptions));
app.use(express.json());
app.use(_userRoute["default"]);
app.use(_conversationRoute["default"]);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST');
    return res.status(200).json({});
  }
  next();
});
var PORT = process.env.PORT || 3030;
var FLUTTER_WEB_APP = _path["default"].join(__dirname, '../public', 'web');
app.use(express["static"](FLUTTER_WEB_APP));
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
app.get('/', function (req, res) {
  var indexPath = _path["default"].join(FLUTTER_WEB_APP, 'index.html');
  res.sendFile(indexPath);
});
var uploadDir = _path["default"].resolve(__dirname, '..', '.', 'uploads');

// Ensure the upload directory exists
if (!_fs["default"].existsSync(uploadDir)) {
  _fs["default"].mkdirSync(uploadDir, {
    recursive: true
  });
}
app.post('/upload', _verifyToken["default"], function (req, res) {
  try {
    var _req$body = req.body,
      image = _req$body.image,
      filename = _req$body.filename;
    var authData = req.authData;

    // console.log(authData._id);

    if (!image || !filename) {
      return res.status(400).send('Image and filename are required');
    }
    var fileExtension = _path["default"].extname(filename);
    var uniqueFilename = "".concat(crypto.randomBytes(16).toString('hex')).concat(fileExtension);
    var buffer = Buffer.from(image, 'base64');
    var filePath = _path["default"].join(uploadDir, uniqueFilename);
    var fileUrl = "uploads/".concat(uniqueFilename);
    _fs["default"].writeFile(filePath, buffer, /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(err) {
        var newFile;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 3;
                break;
              }
              console.error('Error saving file:', err);
              return _context.abrupt("return", res.status(500).send('Error saving file'));
            case 3:
              newFile = new _file["default"]({
                uploadedBy: authData._id,
                url: fileUrl,
                filePath: filePath
              });
              _context.prev = 4;
              _context.next = 7;
              return newFile.save();
            case 7:
              res.status(200).json({
                message: 'File uploaded successfully',
                fileUrl: fileUrl
              });
              _context.next = 14;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](4);
              console.error('Error saving to database:', _context.t0);
              res.status(500).send('Error saving file information to database');
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[4, 10]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  } catch (error) {
    console.log('error:', error);
  }
});
io.on('connection', function (socket) {
  var room;
  socket.on("initConnect", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(jwtData) {
      var jwt, message, user, _message, _yield$getValidUser, username, phoneNumber, _id, _yield$createRoom, socketid;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            jwt = jwtData.jwt; // console.log('jwt', jwt)
            if (!(jwt === null)) {
              _context2.next = 8;
              break;
            }
            room = socket.id;
            socket.join(room);
            message = "It seems you aren't signed in. Please send your number to receive an OTP to enable sign-in.";
            io.to(room).emit("unauthenticated", message);
            _context2.next = 32;
            break;
          case 8:
            if (!(jwt !== null)) {
              _context2.next = 32;
              break;
            }
            _context2.next = 11;
            return (0, _getValidUser["default"])(jwt);
          case 11:
            user = _context2.sent;
            if (!(user === null)) {
              _context2.next = 19;
              break;
            }
            room = socket.id;
            socket.join(room);
            _message = "It seems you aren't signed in. Please send your number to receive an OTP to enable sign-in.";
            io.to(room).emit("unauthenticated", _message);
            _context2.next = 32;
            break;
          case 19:
            _context2.next = 21;
            return (0, _getValidUser["default"])(jwt);
          case 21:
            _yield$getValidUser = _context2.sent;
            username = _yield$getValidUser.username;
            phoneNumber = _yield$getValidUser.phoneNumber;
            _id = _yield$getValidUser._id;
            _context2.next = 27;
            return (0, _createRoom["default"])(_id, socket.id, phoneNumber);
          case 27:
            _yield$createRoom = _context2.sent;
            socketid = _yield$createRoom.socketid;
            room = socketid;
            socket.join(room);
            if (username.length === 0) {
              io.to(room).emit('getusername', "Looks like you still haven't told me your name");
            } else {
              io.to(room).emit('loggedIn', {
                username: username,
                phoneNumber: phoneNumber,
                jwt: jwt
              });
              io.to(room).emit('authenticated', "Greetings ".concat(username, ", I'm here to accept your orders"));
            }
          case 32:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  socket.on("isPhonenumberInput", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(usermsg) {
      var messageValue, usernum, pending;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            messageValue = usermsg.message;
            usernum = (0, _validatePhoneNumber["default"])(messageValue);
            io.to(room).emit('payoorIsTyping');
            if (!(usernum !== null && usernum !== void 0 && usernum.isValid && usernum.country === 'NG')) {
              _context3.next = 10;
              break;
            }
            _context3.next = 6;
            return (0, _createVerification2["default"])(usernum.formattedNumber);
          case 6:
            pending = _context3.sent;
            if (pending === 'pending') {
              io.to(room).emit('pendingotp', "I sent you an OTP, please check your SMS and send it back to confirm you own this number");
              io.to(room).emit('keepusernumberforotp', messageValue);
            }
            _context3.next = 11;
            break;
          case 10:
            io.to(room).emit('error', 'Invalid phone number or unsupported country.');
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
  socket.on("isOtpInput", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(usermsg) {
      var messageValue, userPhoneNumber, usernum, result, phoneNumber, _yield$generateJWT, token, user, isNewUser, _tokens, username, _phoneNumber, tokens, latestToken;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            messageValue = usermsg.message;
            userPhoneNumber = (usermsg.userPhoneNumber || '').trim();
            usernum = (0, _validatePhoneNumber["default"])(userPhoneNumber);
            io.to(room).emit('payoorIsTyping');
            if (!(usernum !== null && usernum !== void 0 && usernum.isValid && usernum.country === 'NG')) {
              _context4.next = 20;
              break;
            }
            _context4.next = 7;
            return (0, _createVerificationCheck2["default"])(messageValue, usernum.formattedNumber);
          case 7:
            result = _context4.sent;
            //{ status: "approved", number: usernum.formattedNumber }; // Consider awaiting actual verification
            phoneNumber = "".concat(result.number);
            if (!(result.status === "approved")) {
              _context4.next = 18;
              break;
            }
            _context4.next = 12;
            return (0, _generateJWT["default"])(phoneNumber);
          case 12:
            _yield$generateJWT = _context4.sent;
            token = _yield$generateJWT.token;
            user = _yield$generateJWT.user;
            isNewUser = _yield$generateJWT.isNewUser;
            io.to(room).emit('saveJWT', token);
            if (user.username.length === 0) {
              io.to(room).emit('receivedotp', "Your number ".concat(result.number, " has been saved.\nPlease let us know your name"));
              io.to(room).emit('getusername');
            } else {
              username = user.username, _phoneNumber = user.phoneNumber, tokens = user.tokens;
              latestToken = (_tokens = tokens[tokens.length - 1]) === null || _tokens === void 0 ? void 0 : _tokens.token; // Use optional chaining
              io.to(room).emit('authenticated', "Greetings ".concat(username, ", I'm here to accept your orders"));
              io.to(room).emit('loggedIn', {
                username: username,
                phoneNumber: _phoneNumber,
                jwt: latestToken
              });
            }
          case 18:
            _context4.next = 21;
            break;
          case 20:
            // Optionally, handle invalid phone numbers or non-NG numbers
            io.to(currentroom).emit('error', 'Invalid phone number or unsupported country.');
          case 21:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
  socket.on("isNameinput", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(usermsg) {
      var username, jwt, updatedUser, _tokens2, _username, phoneNumber, tokens, _id, latestToken;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            username = usermsg.message;
            jwt = usermsg.jwt;
            _context5.next = 4;
            return (0, _saveUserName["default"])(username, jwt);
          case 4:
            updatedUser = _context5.sent;
            io.to(room).emit('payoorIsTyping');
            if (updatedUser) {
              _username = updatedUser.username, phoneNumber = updatedUser.phoneNumber, tokens = updatedUser.tokens, _id = updatedUser._id;
              latestToken = (_tokens2 = tokens[tokens.length - 1]) === null || _tokens2 === void 0 ? void 0 : _tokens2.token;
              io.to(room).emit('loggedIn', {
                username: _username,
                phoneNumber: phoneNumber,
                jwt: latestToken
              });
              io.to(room).emit('authenticated', "Greetings ".concat(_username, ", I'm here to accept your orders"));
            }
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());
  socket.on("joinroom", /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(msg) {
      var jwt, _yield$getValidUser2, _id, username;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            jwt = msg.jwt;
            _context6.next = 3;
            return (0, _getValidUser["default"])(jwt);
          case 3:
            _yield$getValidUser2 = _context6.sent;
            _id = _yield$getValidUser2._id;
            username = _yield$getValidUser2.username;
            //console.log('joinroom', msg, _id, username);
            socket.join("".concat(_id));
          case 7:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());
  socket.on("isLoggedInInput", /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(usermsg) {
      var jwt, message, _yield$getValidUser3, _id, username;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            jwt = usermsg.jwt, message = usermsg.message;
            _context7.prev = 1;
            _context7.next = 4;
            return (0, _getValidUser["default"])(jwt);
          case 4:
            _yield$getValidUser3 = _context7.sent;
            _id = _yield$getValidUser3._id;
            username = _yield$getValidUser3.username;
            _context7.next = 9;
            return (0, _saveMessage["default"])(usermsg);
          case 9:
            // Save message before emitting

            io.to("".concat(_id)).emit('chat_message_from_user', {
              message: message,
              _id: _id,
              username: username
            });

            // console.log('room in chat:', room);
            _context7.next = 15;
            break;
          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            // Handle errors gracefully, e.g., log the error, inform the user, etc.
            console.error('Error processing message:', _context7.t0);
          case 15:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[1, 12]]);
    }));
    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }());
  socket.on("isAdminJoinRoom", /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(userid) {
      var _yield$joinRoom, socketid;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _joinRoom["default"])(userid);
          case 2:
            _yield$joinRoom = _context8.sent;
            socketid = _yield$joinRoom.socketid;
            room = socketid;

            //console.log(room);

            //socket.join(room);
            console.log('userid', userid);
            socket.join("".concat(userid));
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return function (_x8) {
      return _ref8.apply(this, arguments);
    };
  }());
  socket.on("isAdminInput", /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(adminmsg) {
      var content, userid;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            content = adminmsg.content, userid = adminmsg.userid;
            try {
              // console.log(content, userid); // Log message content before saving

              // Implement logic to save the admin message (if needed)
              // This could involve saving the content, timestamp, room, etc.
              // await saveAdminMessage(adminmsg); // Example for saving

              io.to("".concat(userid)).emit('chatMessageFromPayoor', content);
              //io.emit('chatMessageFromPayoor', content);
            } catch (error) {
              // Handle errors gracefully, e.g., log the error
              console.error('Error processing admin message:', error);
            }
          case 2:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    return function (_x9) {
      return _ref9.apply(this, arguments);
    };
  }());
  socket.on('disconnect', function () {
    //socket.leave(room);

    //console.log('user left room:', room)
    // console.log('A user disconnected:', socket.id);
  });
});
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  server.listen(PORT, function (error) {
    if (error) {
      return console.error('Error starting server:', error);
    }
    // console.log(`Server started on port ${PORT}`);
  });
})["catch"](function (error) {
  console.error('Error connecting to MongoDB:', error);
});