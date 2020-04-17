const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const connection = require('./models/connection');
const TicketController = require('./controllers/ticket.controller');
const AdminController = require('./controllers/admin.controller');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 
    extended: true
}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get("/", (req, res) => { 
    res.send("Success");
});


// base package
app.use("/api", TicketController);
app.use("/api", AdminController);

app.listen("3000", () => {
    console.log("Server Started");
});


module.exports = app;
