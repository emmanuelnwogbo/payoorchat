const mongoose = require('mongoose');

// Define the schema for the Message model
const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: {
    type: String,
    required: true
  },
  userPhoneNumber: {
    type: String,
    required: true
  },
  isUser: {
    type: Boolean,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    required: true
  },
  isSeen: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
