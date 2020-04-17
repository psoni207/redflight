const express = require('express');
const router = express.Router();
const Ticket = require('../schemas/ticket.schema.js');

/**
 * Create -> Post -> make something
 * Read -> Get -> get something
 * Update -> Put -> change something
 * Delete -> Delete -> remove something
 * Here ->
 *      get -> getAll
 *      post -> getOne
 */

//update ticket status with ticketNumber
router.put("/tickets",function(req,res){
    Ticket.updateTicketStatus
});

//get all close tickets
router.get("/tickets/open",function(req,res){
    Ticket.getOpenTickets
});

//get all close tickets
router.get("/tickets/close",function(req,res){
    Ticket.getCloseTickets
});
//get all tickets
router.get("/tickets",function(req,res){
    Ticket.getAll
});

//get user details owing the ticket with ticketNumber
router.post("/tickets/details",function(req,res){
    Ticket.getUserDetails
});

//create ticket
router.post("/tickets/create",function(req,res){
    Ticket.createTicket
});
//view ticket status with ticketNumber
router.post("/ticketes/view",function(req,res){
    Ticket.viewStatus
});

module.exports = router;