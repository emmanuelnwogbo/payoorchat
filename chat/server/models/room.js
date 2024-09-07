const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;