if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}
import "regenerator-runtime";
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const io = require('socket.io')(server);
import path from 'path';

import validatePhoneNumber from './services/payoor/validatePhoneNumber';
import generateJWT from './services/payoor/generateJWT';
import saveMessage from './services/payoor/saveMessage';

import createVerification from './services/twilio/createVerification';
import createVerificationCheck from './services/twilio/createVerificationCheck';

//import createService from './services/twilio/createService';
//createService();

const PORT = process.env.PORT || 3000;
const FLUTTER_WEB_APP = path.join(__dirname, '../public', 'web');
app.use(express.static(FLUTTER_WEB_APP));

app.get('/', (req, res) => {
  const indexPath = path.join(FLUTTER_WEB_APP, 'index.html');

  res.sendFile(indexPath);
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', async (message) => {
    //console.log(message);

    if (message.isLoggedIn && message.jwt.length) {
      saveMessage(message);
      return;
    } else {
      try {
        const msg = message.message?.trim();
        const userPhoneNumber = message.userPhoneNumber?.trim();
        const isOtp = message.isOtp;

        console.log(isOtp, userPhoneNumber, msg)

        if (msg.length === 6 && isOtp && userPhoneNumber.length) {
          const usernum = validatePhoneNumber(userPhoneNumber);

          if (usernum) {
            if (usernum.isValid && usernum.country === 'NG') {
              const result = await createVerificationCheck(msg, usernum.formattedNumber);

              if (result.status === "approved") {
                const phoneNumber = `${result.number}`;

                const { token, user, isNewUser } = await generateJWT(phoneNumber);

                console.log({ token, user, isNewUser });
                io.emit('receivedotp', `Your number ${result.number} has been saved. You can proceed with any orders`);

                io.emit('saveJWT', token);

                io.emit('saveId', user._id);
              }
            }
          }
        } else if (msg.length === 11) {
          const usernum = validatePhoneNumber(msg);

          if (usernum) {
            if (usernum.isValid && usernum.country === 'NG') {
              const pending = await createVerification(usernum.formattedNumber);

              if (pending === 'pending') {
                io.emit('pendingotp', "I sent you an otp, pls check your sms and send it back to me to confirm you own this number");
              }
            } else {
              io.emit('chat message from payoor', "The number you sent is invalid pls check and send it again");
            }
          }
        } else {

        }
      } catch (error) {
        console.log(error)
        io.emit('chat message from payoor', "The number you sent is invalid pls check and send it again");
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
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