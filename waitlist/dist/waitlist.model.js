"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var waitlistSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  selectedoptions: {
    type: Array,
    "default": [{
      type: String
    }]
  },
  emailsent: {
    type: Boolean,
    "default": false
  }
});
var Waitlist = mongoose.model('Waitlist', waitlistSchema);
module.exports = Waitlist;