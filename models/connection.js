//this file creates connection
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/redflight",{
    userUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('DB Connected!'))
.catch(error => {
    console.log(Error,error.message);
});

const Ticket = require("../schemas/ticket.schema");
const User = require("../schemas/user.schema");
const Flight = require("../schemas/flight.schema");

module.exports = {Ticket,User, Flight};