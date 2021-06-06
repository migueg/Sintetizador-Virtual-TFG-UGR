


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const dbController = require("./controllers/dbcontroller");

const app = express();


var corsOptions = {
  origin: ["http://localhost:3000", "192.168.1.62:3000"]
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

app.get("/createCategories", (req,res) =>{
  dbController.createCategories(req,res);
  
})

app.get("/createNotes", (req,res) =>{
  dbController.createNotes(req,res);
  
})

app.get("/categories", (req,res) =>{
  dbController.getCategories(req,res);
  
})

app.get("/notes", (req, res) => {
   
  dbController.getNotes(req,res)

}) 

app.get("/state/:id", (req,res) => {
    dbController.getState(req,res);
})

app.get("/states/metadata", (req,res) => {
  dbController.getStatesMetaData(req,res);
})

app.get("/profile",(req,res)=>{
  dbController.getProfile(req,res);
});

app.post("/save/:id" , (req, res) => {
    if(req.header('Content-Type') === 'application/json'){
        //console.log('AQUI: ' + req.params.id);
        dbController.saveState(req,res);
    }
    
});

app.get("/maxSize", (req,res) =>{
    dbController.getMaxSize(req,res)
})

app.post("/singup", (req,res) => {
  if(req.header('Content-Type') === 'application/json'){
    dbController.registerUser(req,res);
}

})

app.post('/singin', (req,res) =>{
  if(req.header('Content-Type') === 'application/json'){
    dbController.login(req,res);
  }
})

app.post('/edit',(req,res) =>{
  if(req.header('Content-Type') === 'application/json'){
    dbController.editProfile(req,res)
  }
})

app.post('/password', (req,res) =>{
  if(req.header('Content-Type') === 'application/json'){
    dbController.editPassword(req,res);
  }
})

app.delete('/delete/:id',(req,res) =>{
      
      dbController.deleteSound(req,res)
  
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});