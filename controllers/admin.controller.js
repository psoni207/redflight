const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.model.js');

// reset all the ticket to inActive
router.put("/admin", function(req,res){
    Admin.resetAllTickets
});

//add user details
router.post("/admin",function(req,res){
    Admin.addUserDetails
});

module.exports = router;
