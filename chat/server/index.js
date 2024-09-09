if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}
import "regenerator-runtime";
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');

const io = require('socket.io')(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      'https://dfa1-149-22-81-214.ngrok-free.app',
      "https://chat.payoor.shop",
      "http://localhost:64274",
    ],
    methods: ["GET", "POST"]
  }
});

import path from 'path';
import cors from 'cors';

import validatePhoneNumber from './services/payoor/validatePhoneNumber';
import generateJWT from './services/payoor/generateJWT';
import saveMessage from './services/payoor/saveMessage';
import saveUserName from './services/payoor/saveUserName';
import getValidUser from './services/payoor/getValidUser';
import sanitizeId from './services/payoor/sanitizeId';
import toggleOnlineState from './services/payoor/toggleOnlineState';
import createRoom from './services/payoor/createRoom';
import joinRoom from './services/payoor/joinRoom';

import userRoute from './routes/userRoute';
import conversationRoute from './routes/conversationRoute';

import createVerification from './services/twilio/createVerification';
import createVerificationCheck from './services/twilio/createVerificationCheck';

import createVerificationTest from './services/payoor/test/createVerification';
import createVerificationCheckTest from './services/payoor/test/createVerificationCheck';

//import createService from './services/twilio/createService';
//createService();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://dfa1-149-22-81-214.ngrok-free.app',
    'https://chat.payoor.shop',
    "http://localhost:64274",
  ],
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use(express.json());

app.use(userRoute);
app.use(conversationRoute);

const PORT = process.env.PORT || 3030;
const FLUTTER_WEB_APP = path.join(__dirname, '../public', 'web');
app.use(express.static(FLUTTER_WEB_APP));

app.get('/', (req, res) => {
  const indexPath = path.join(FLUTTER_WEB_APP, 'index.html');

  res.sendFile(indexPath);
});

io.on('connection', socket => {
  let room;

  socket.on("initConnect", async (jwtData) => {
    const { jwt } = jwtData;

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

        console.log('socketid', socketid);

        room = socketid;

        socket.join(room);

        if (!username) {
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

    if (updatedUser) {
      const { username, phoneNumber, tokens, _id } = updatedUser;
      const latestToken = tokens[tokens.length - 1]?.token;

      io.to(room).emit('loggedIn', { username, phoneNumber, jwt: latestToken });
      io.to(room).emit('authenticated', `Greetings ${username}, I'm here to accept your orders`);
    }
  });

  socket.on("isLoggedInInput", async (usermsg) => {
    const { jwt, message } = usermsg;
    const { _id, username } = await getValidUser(jwt);

    io.to(room).emit('chat_message_from_user', { message, _id, username });

    console.log('room in chat:', room);

    await saveMessage(usermsg);
  });

  socket.on("isAdminJoinRoom", async (userid) => {
    const { socketid } = await joinRoom(userid);

    room = socketid;

    console.log(room);

    socket.join(room);
  });

  socket.on("isAdminInput", async (adminmsg) => {
    const { content } = adminmsg;

    console.log(room, content)

    io.to(room).emit('chatMessageFromPayoor', content);
  })

});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    server.listen(PORT, (error) => {
      if (error) {
        return console.error('Error starting server:', error);
      }
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });