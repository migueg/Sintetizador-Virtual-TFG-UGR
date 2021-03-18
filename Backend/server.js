


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dbController = require("./controllers/dbcontroller");

const app = express();


var corsOptions = {
  origin: "http://localhost:8081"
};

require('./dbhandler')


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Server." });
});


app.get("/createNotes", (req,res) =>{
  dbController.createNotes();
})
/* app.get("/notes", (req, res) => {
   console.log('HOLA')
   var notes = dbHandler.getNotes()
   console.log(notes)
}) */

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});