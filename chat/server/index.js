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
      "https://chat.payoor.shop"
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

import userRoute from './routes/userRoute';
import conversationRoute from './routes/conversationRoute';

import createVerification from './services/twilio/createVerification';
import createVerificationCheck from './services/twilio/createVerificationCheck';

//import createService from './services/twilio/createService';
//createService();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:61499',
    'https://chat.payoor.shop',
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

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on("isPhonenumberInput", async (usermsg) => {
    console.log(usermsg);
    const messageValue = usermsg.message;

    const usernum = validatePhoneNumber(messageValue);

    if (usernum?.isValid && usernum.country === 'NG') {
      const pending = await createVerification(usernum.formattedNumber);

      if (pending === 'pending') {
        socket.emit('pendingotp', "I sent you an OTP, please check your SMS and send it back to confirm you own this number");
        socket.emit('keepusernumberforotp', messageValue);
      }
    } else {
      // Optionally, handle invalid phone numbers or non-NG numbers
      socket.emit('error', 'Invalid phone number or unsupported country.');
    }
  });

  socket.on("isOtpInput", async (usermsg) => {
    console.log(usermsg);
    const messageValue = usermsg.message;
    const userPhoneNumber = (usermsg.userPhoneNumber || '').trim();

    const usernum = validatePhoneNumber(userPhoneNumber);

    if (usernum?.isValid && usernum.country === 'NG') {
      const result = await createVerificationCheck(messageValue, usernum.formattedNumber);//{ status: "approved", number: usernum.formattedNumber }; // Consider awaiting actual verification
      const phoneNumber = `${result.number}`;
      if (result.status === "approved") {
        const { token, user, isNewUser } = await generateJWT(phoneNumber);

        socket.emit('saveJWT', token);

        if (user.username.length === 0) {
          socket.emit('receivedotp', `Your number ${result.number} has been saved.\nPlease let us know your name`);
          socket.emit('getusername');
        } else {
          const { username, phoneNumber, tokens } = user;
          const latestToken = tokens[tokens.length - 1]?.token; // Use optional chaining
          socket.emit('receivedotp', `Greetings ${username}, I'm here to accept your orders`);
          socket.emit('loggedIn', { username, phoneNumber, jwt: latestToken });
        }
      }
    } else {
      // Optionally, handle invalid phone numbers or non-NG numbers
      socket.emit('error', 'Invalid phone number or unsupported country.');
    }
  });

  socket.on("isNameinput", async (usermsg) => {
    const username = usermsg.message;
    const jwt = usermsg.jwt;

    const updatedUser = await saveUserName(username, jwt);

    if (updatedUser) {
      const { username, phoneNumber, tokens } = updatedUser;
      const latestToken = tokens[tokens.length - 1]?.token; // Use optional chaining

      socket.emit('loggedIn', { username, phoneNumber, jwt: latestToken });
      socket.emit('greeting', `Greetings ${username}, I'm here to accept your orders`);
    } else {
      // Optionally, handle cases where the user was not updated
      socket.emit('error', 'Failed to update username.');
    }
  });

  socket.on("isAuthenticated", async (jwt) => {
    try {
      const { username, phoneNumber, _id } = await getValidUser(jwt);

      if (!username) {
        socket.emit('getusername', `Looks like you still haven't told me your name`);
      } else {
        socket.emit('loggedIn', { username, phoneNumber, jwt });
        socket.emit('greeting', `Greetings ${username}, I'm here to accept your orders`);
      }

      const room = sanitizeId(`${_id}`);

      const currentroom = await createRoom(room);

      socket.join(currentroom.roomId);

      if (socket.rooms.has(room)) {
        console.log('user is online:', room);
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      socket.emit('error', 'Authentication failed. Please try again.');
    }
  });

  socket.on("isAdminOnline", async () => {
    //console.log("admin is online");
  });

  socket.on("isAdminJoinRoom", async (roomid) => {
    const room = sanitizeId(`${roomid}`);

    const currentroom = await createRoom(room);

    socket.join(currentroom.roomId);

    if (socket.rooms.has(room)) {
      console.log('admin is online:', room);
    }
  });

  socket.on("isAdminInput", async (adminmsg) => {
    console.log(adminmsg);
    const { content, current_userid } = adminmsg;

    const room = sanitizeId(`${current_userid}`);

    const currentroom = await createRoom(room);

    console.log('check admin message:', currentroom);

    io.to(currentroom.roomId).emit('chat_message_from_payoor', content);
  });

  socket.on("isLoggedInInput", async (usermsg) => {
    const { jwt, message } = usermsg;
    const { _id, username } = await getValidUser(jwt);
    console.log('user', _id, usermsg);
    const room = sanitizeId(`${_id}`);

    console.log('room', room)

    const currentroom = await createRoom(room);

    console.log('currentroom:', currentroom)

    io.to(currentroom.roomId).emit('chat_message_from_user', { message, _id, username });

    await saveMessage(usermsg); // Ensure saveMessage is async if needed
  });

  socket.on('disconnect', () => {
    //socket.leave(room);

    //console.log('user left room:', room)
    console.log('A user disconnected:', socket.id);
  });
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