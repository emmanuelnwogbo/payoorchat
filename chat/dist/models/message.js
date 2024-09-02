"use strict";

var mongoose = require('mongoose');

// Define the schema for the Message model
var messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  userPhoneNumber: {
    type: String,
    required: true
  },
  isSender: {
    type: Boolean,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    "default": Date.now,
    required: true
  }
});

// Create a Mongoose model named 'Message' using the schema
var Message = mongoose.model('Message', messageSchema);
module.exports = Message;