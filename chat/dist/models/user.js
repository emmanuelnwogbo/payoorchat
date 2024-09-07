"use strict";

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    "default": ""
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  isVerified: {
    type: Boolean,
    "default": false
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  awaitingOtp: {
    // Changed to camelCase for consistency
    type: Boolean,
    "default": false // It's good to set a default value
  },
  roles: {
    type: [String],
    "default": ['user']
  },
  isOnline: {
    type: Boolean,
    "default": false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});
userSchema.methods.getToken = function (criteria) {
  var user = this;

  // If criteria is not specified, return the first token
  if (!criteria) {
    return user.tokens.length > 0 ? user.tokens[0].token : null;
  }

  // Find a token that matches the criteria
  var tokenObj = user.tokens.find(function (tokenObj) {
    return tokenObj.token === criteria;
  });
  return tokenObj ? tokenObj.token : null;
};
module.exports = mongoose.model('User', userSchema);