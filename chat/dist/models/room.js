"use strict";

var mongoose = require('mongoose');
var roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  created_at: {
    type: Date,
    "default": Date.now
  },
  updated_at: {
    type: Date,
    "default": Date.now
  }
});
var Room = mongoose.model('Room', roomSchema);
module.exports = Room;