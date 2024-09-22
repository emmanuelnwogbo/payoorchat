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
var _messageRoute = _interopRequireDefault(require("./routes/messageRoute"));
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
var corsOrginArray = ['http://localhost:3000', 'https://dfa1-149-22-81-214.ngrok-free.app', 'https://chat.payoor.shop', "http://localhost:50258"];
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
app.use(_messageRoute["default"]);
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
      var jwt, message;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            jwt = jwtData.jwt;
            console.log(jwt);
            if (jwt === null) {
              message = "It seems you aren't signed in. Please send your number to receive an OTP to enable sign-in.";
              io.to(room).emit("unauthenticated", message);
            } else {}
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  /*socket.on("initConnect", async (jwtData) => {
    const { jwt } = jwtData;
      // console.log('jwt', jwt)
      if (jwt === null) {
      room = socket.id;
      socket.join(room);
        const message = "It seems you aren't signed in. Please send your number to receive an OTP to enable sign-in.";
        io.to(room).emit("unauthenticated", message);
    } else if (jwt !== null) {
      const user = await getValidUser(jwt);
        if (user === null) {
        room = socket.id;
        socket.join(room);
          const message = "It seems you aren't signed in. Please send your number to receive an OTP to enable sign-in.";
          io.to(room).emit("unauthenticated", message);
      } else {
        const { username, phoneNumber, _id } = await getValidUser(jwt);
        const { socketid } = await createRoom(_id, socket.id, phoneNumber);
          room = socketid;
          socket.join(room);
          if (username.length === 0) {
          io.to(room).emit('getusername', `Looks like you still haven't told me your name`);
        } else {
          io.to(room).emit('loggedIn', { username, phoneNumber, jwt });
          io.to(room).emit('authenticated', `Greetings ${username}, I'm here to accept your orders`);
        }
      }
      }
  });
    socket.on("isPhonenumberInput", async (usermsg) => {
    const messageValue = usermsg.message;
    const usernum = validatePhoneNumber(messageValue);
      io.to(room).emit('payoorIsTyping');
      if (usernum?.isValid && usernum.country === 'NG') {
      const pending = await createVerificationTest(usernum.formattedNumber);
        if (pending === 'pending') {
          io.to(room).emit('pendingotp', "I sent you an OTP, please check your SMS and send it back to confirm you own this number");
        io.to(room).emit('keepusernumberforotp', messageValue);
      }
    } else {
      io.to(room).emit('error', 'Invalid phone number or unsupported country.');
    }
  });
    socket.on("isOtpInput", async (usermsg) => {
    const messageValue = usermsg.message;
    const userPhoneNumber = (usermsg.userPhoneNumber || '').trim();
      const usernum = validatePhoneNumber(userPhoneNumber);
      io.to(room).emit('payoorIsTyping');
      if (usernum?.isValid && usernum.country === 'NG') {
      const result = await createVerificationCheckTest(messageValue, usernum.formattedNumber);//{ status: "approved", number: usernum.formattedNumber }; // Consider awaiting actual verification
      const phoneNumber = `${result.number}`;
      if (result.status === "approved") {
        const { token, user, isNewUser } = await generateJWT(phoneNumber);
          io.to(room).emit('saveJWT', token);
          if (user.username.length === 0) {
          io.to(room).emit('receivedotp', `Your number ${result.number} has been saved.\nPlease let us know your name`);
          io.to(room).emit('getusername');
        } else {
          const { username, phoneNumber, tokens } = user;
          const latestToken = tokens[tokens.length - 1]?.token; // Use optional chaining
          io.to(room).emit('authenticated', `Greetings ${username}, I'm here to accept your orders`);
          io.to(room).emit('loggedIn', { username, phoneNumber, jwt: latestToken });
        }
      }
    } else {
      // Optionally, handle invalid phone numbers or non-NG numbers
      io.to(currentroom).emit('error', 'Invalid phone number or unsupported country.');
    }
  });
    socket.on("isNameinput", async (usermsg) => {
    const username = usermsg.message;
    const jwt = usermsg.jwt;
      const updatedUser = await saveUserName(username, jwt);
      io.to(room).emit('payoorIsTyping');
      if (updatedUser) {
      const { username, phoneNumber, tokens, _id } = updatedUser;
      const latestToken = tokens[tokens.length - 1]?.token;
        io.to(room).emit('loggedIn', { username, phoneNumber, jwt: latestToken });
      io.to(room).emit('authenticated', `Greetings ${username}, I'm here to accept your orders`);
    }
  });
    socket.on("joinroom", async (msg) => {
    const jwt = msg.jwt;
      const { _id, username } = await getValidUser(jwt);
    //console.log('joinroom', msg, _id, username);
    socket.join(`${_id}`);
  })
    socket.on("isLoggedInInput", async (usermsg) => {
    const { jwt, message } = usermsg;
      try {
      const { _id, username } = await getValidUser(jwt);
        await saveMessage(usermsg); // Save message before emitting
        io.to(`${_id}`).emit('chat_message_from_user', { message, _id, username });
        // console.log('room in chat:', room);
    } catch (error) {
      // Handle errors gracefully, e.g., log the error, inform the user, etc.
      console.error('Error processing message:', error);
    }
  });
    socket.on("isAdminJoinRoom", async (userid) => {
    const { socketid } = await joinRoom(userid);
      room = socketid;
      //console.log(room);
      //socket.join(room);
    console.log('userid', userid)
    socket.join(`${userid}`);
  });
    socket.on("isAdminInput", async (adminmsg) => {
    const { content, userid } = adminmsg;
      try {
      // console.log(content, userid); // Log message content before saving
        // Implement logic to save the admin message (if needed)
      // This could involve saving the content, timestamp, room, etc.
      // await saveAdminMessage(adminmsg); // Example for saving
        io.to(`${userid}`).emit('chatMessageFromPayoor', content);
      //io.emit('chatMessageFromPayoor', content);
    } catch (error) {
      // Handle errors gracefully, e.g., log the error
      console.error('Error processing admin message:', error);
    }
  });*/

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
    console.log("Server started on port ".concat(PORT));
  });
})["catch"](function (error) {
  console.error('Error connecting to MongoDB:', error);
});