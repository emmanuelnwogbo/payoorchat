const crypto = require('crypto');

// Generate a 256-bit (32-byte) key and convert it to a hexadecimal string
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Your JWT secret key is:', secretKey);