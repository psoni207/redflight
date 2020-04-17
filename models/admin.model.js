const moongose = require('mongoose');
const TicketModel = moongose.model('tickets');
const FlightModel = moongose.model('flights');
const UserModel = moongose.model('users');

const Admin = {};

Admin.restAllTickets = ( (req,res) => {

    //change all close tickets to open
    TicketModel.updateMany({
        flightNumber: req.body.busNumber,
        ticketStatus: 'close'
    },
    {ticketStatus: 'open'},
    (error,message) => {
        if(!error){
            //reset available seats
            FlightModel.updateOne({flightNumber: req.body.flightNumber}, {seatsAvailable: 40}, (error,message) => {
                if(!error){
                    res.send(message);
                }else{
                    res.send(error);
                }
            });
        }else{
            res.send(error);
        }
    });
} );

Admin.addUserDetails = ( (req,res) => {
    TicketModel.findOne ({ticketNumber: req.body.ticketNumber}, (err,user) => {
        if(!err){
            if(user !== null){
                //add details
                UserModel.updateOne({userID: user.userID},
                    {
                        userName: req.body.userName,
                        userContact: req.body.userContact,
                        userAddress: req.body.userAddress
                    },
                    (err,msg) => {
                        if(!err){
                            res.send(msg);
                        }else{
                            res.send(err);
                        }
                    }
                )
            }else{
                res.send("No user found");
            }
        }else{
            res.send(err);
        }
    })
} );

module.exports = Admin;