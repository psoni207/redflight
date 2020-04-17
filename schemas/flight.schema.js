const mongoose = require('mongoose');

var FlightSchema = new mongoose.Schema({
    flightNumber:{
        type: String
    },
    seatsAvailable:{
        type: Number,
        default: 40
    },
    totalSeats:{
        type: Number,
        default: 40
    },
    flightSoruce:{
        type: String
    },
    flightDestination:{
        type: String
    }
});

module.exports = mongoose.model("flights",FlightSchema);
