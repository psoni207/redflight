const mongoose = require('mongosoe');
const TicketModel = mongoose.model('tickets');
const UserModel = mongoose.model('users');
const FlightModel = mongoose.model('flights');

const Ticket = {};

//update ticket staus
Ticket.updateTicketStaus = (req,res) => {
        //validate request
        if(!req.body.ticketNumber){
            return res.status(400).send({
                message: "ticket number field can not be empty"
            });
        }   

        TicketModel.updateOne({ticketNumber:req.body.ticketNumber},
            {ticketStatus: req.body.ticketStatus}, (err,msg) => {
                if(!err){
                    res.send(msg);
                }else{
                    res.send(err);
                }
            }
        );
}

// get ticket status by ticketNumber
Ticket.viewStatus = (req,res) => {
    if(!req.body.ticketNumber){
        return res.status(400).send({
            message: "field can not be empty"
        });
    }

    TicketModel.updateOne({ticketNumber: req.body.ticketNumber},(err,msg) => {
        if(!err){
            if(ticketStatus == null){
                res.send("Empty");
            }else{
                res.send('ticket is Active' + ticketStatus.isActive);
            }
        }else{
            res.send(err);
        }
    });
}


//get all closed tickets
Ticket.getCloseTickets = ( (req,res) => {
    TicketModel.find({ticketStatus: 'close'}, (error, closedTickets) => {
        if(!error){
            res.send(closedTickets);
        }else{
            res.send(error);
        }
    });
})

//get all open tickets
Ticket.getOpenTickets = (req,res) => {
    TicketModel.find({ticketStatus: 'open'}, (error, openTickets) => {
        if(!error){
            res.send(openTickets);
        }else{
            res.send(error);
        }
    });
}

//view user details from ticket number
Ticket.getUserDetails = (req,res) => {
    //validate request
    if(!req.body.ticketNumber){
        return res.status(400).send({
            message: "ticket number field can not be empty"
        });
    }

    TicketModel.findOne({ticketNumber: req.body.ticketNumber}, (error, ticketDetails) =>{
        if(!error){
            // get user details with userID
            if(ticketDetails == null){
                res.send("No user found");
            }else{
                UserModel.find({userID: ticketDetails.userID}, (error,userDetails) => {
                    if(!error){
                        if(userDetails.userName == null){
                            res.send('user details not found');
                        }else{
                            res.send(userDetails);
                        }
                    }else{
                        res.send('can not find user');
                    }
                });
            }
        }else{
            res.send(error);
        }
    });
}

//get all tickets
Ticket.getAll = (req,res) => {
    TicketModel.find((err,tickets) => {
        if(!err){
            res.send(tickets);
        }else{
            res.send(err);
        }
    });
}

// create ticket
Ticket.createTicket = (req,res) => {
    //validate request
    if(!req.body){
        return res.status(400).send({
            message: "field can not be empty"
        });
    }

    var ticket =  new TicketModel();
    ticket.ticketNumber = req.body.ticketNumber;
    ticket.ticketStatus = req.body.ticketStatus;
    ticket.flightNumber = req.body.flightNumber;
    ticket.userID = req.body.userID;
    ticket.seatNumber = req.body.seatNumber;
    ticket.flightFare = req.body.flightFare;


    FlightModel.findOne({ticketNumber:req.body.ticketNumber},(error,flight)=>{
        if(flight){

            if(flight.seatsAvailable > 0){
            FlightModel.updateOne({flightNumber:req.body.flightNumber},{$inc:{seatAvailable:-1} }, (err,msg) => {
                if(!err){
                    ticket.save( (error, data ) =>{
                        if(!error){
                            res.send("Your Ticket ID is: " + ticket.ticketNumber);
                        }else{
                            res.send(error);
                        }                       
                    });

                }else{
                    res.send(err);
                }
            });
            }else{
                res.send('All the seats are closed on flight number: ' + req.body.flightNumber);
            }
        }else{
            res.send("No flight registered with flight number: " + req.body.flightNumber);
        }
    });
}

module.exports = Ticket;