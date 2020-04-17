const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: 'can not be blank'
    },
    ticketNumber: {
        type: String,
        required: 'can not be blank'
    },
    userName: {
        type: String,
        required: 'can not be blank'
    },
    userContact: {
        type: String
    },
    userAddress: {
        type: String
    }
    
}, {timestamps: true});

module.exports = mongoose.model("users",UserSchema);