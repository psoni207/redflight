const mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
    ticketNumber: {
        type: String,
        required: 'can not be blank'
    },
    userID: {
        type: String,
        required: 'can not be blank'
    },
    ticketStatus: {
        type: String,
        default: 'close'
    },
    flightNumber: {
        type: String,
        required: 'can not be blank'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    seatNumber: {
        type: Number
    },
    flightFare: {
        type: Number
    }
});

module.exports = mongoose.model("tickets",TicketSchema);
