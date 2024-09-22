if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}
import "regenerator-runtime";
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const crypto = require('crypto');
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

const corsOrginArray = [
  'http://localhost:3000',
  'https://dfa1-149-22-81-214.ngrok-free.app',
  'https://chat.payoor.shop',
  "http://localhost:54785",
]

const io = require('socket.io')(server, {
  cors: {
    origin: corsOrginArray,
    methods: ["GET", "POST"]
  }
});

import validatePhoneNumber from './services/payoor/validatePhoneNumber';
import generateJWT from './services/payoor/generateJWT';
import saveMessage from './services/payoor/saveMessage';
import saveUserName from './services/payoor/saveUserName';
import getValidUser from './services/payoor/getValidUser';
import sanitizeId from './services/payoor/sanitizeId';
import toggleOnlineState from './services/payoor/toggleOnlineState';
import createRoom from './services/payoor/createRoom';
import joinRoom from './services/payoor/joinRoom';
import verifyToken from './services/payoor/verifyToken';

import File from './models/file';

import userRoute from './routes/userRoute';
import messageRoute from './routes/messageRoute';
import conversationRoute from './routes/conversationRoute';

import createVerification from './services/twilio/createVerification';
import createVerificationCheck from './services/twilio/createVerificationCheck';

import createVerificationTest from './services/payoor/test/createVerification';
import createVerificationCheckTest from './services/payoor/test/createVerificationCheck';

//import createService from './services/twilio/createService';
//createService();

const corsOptions = {
  origin: corsOrginArray,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(userRoute);
app.use(conversationRoute);
app.use(messageRoute);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST');
    return res.status(200).json({});
  }
  next();
});

const PORT = process.env.PORT || 3030;
const FLUTTER_WEB_APP = path.join(__dirname, '../public', 'web');
app.use(express.static(FLUTTER_WEB_APP));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  const indexPath = path.join(FLUTTER_WEB_APP, 'index.html');

  res.sendFile(indexPath);
});

const uploadDir = path.resolve(__dirname, '..', '.', 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.post('/upload', verifyToken, (req, res) => {
  try {
    const { image, filename } = req.body;

    const { authData } = req;

    // console.log(authData._id);

    if (!image || !filename) {
      return res.status(400).send('Image and filename are required');
    }

    const fileExtension = path.extname(filename);
    const uniqueFilename = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;

    const buffer = Buffer.from(image, 'base64');
    const filePath = path.join(uploadDir, uniqueFilename);

    const fileUrl = `uploads/${uniqueFilename}`;

    fs.writeFile(filePath, buffer, async (err) => {
      if (err) {
        console.error('Error saving file:', err);
        return res.status(500).send('Error saving file');
      }

      const newFile = new File({
        uploadedBy: authData._id,
        url: fileUrl,
        filePath
      });

      try {
        await newFile.save();
        res.status(200).json({ message: 'File uploaded successfully', fileUrl });
      } catch (dbError) {
        console.error('Error saving to database:', dbError);
        res.status(500).send('Error saving file information to database');
      }
    });
  } catch (error) {
    console.log('error:', error)
  }
});

io.on('connection', socket => {
  let room;

  socket.on("initConnect", async (jwtData) => {
    const { jwt } = jwtData;

    console.log(jwt);

    if (jwt === null) {
      const message = "It seems you aren't signed in. Please send your number to receive an OTP to enable sign-in.";

      io.to(room).emit("unauthenticated", message);
    } else {

    }
  })

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

  socket.on('disconnect', () => {
    //socket.leave(room);

    //console.log('user left room:', room)
    // console.log('A user disconnected:', socket.id);
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