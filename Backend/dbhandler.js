

const mongoose = require('mongoose');

//Conectamos con la base de datos


    mongoose.connect('mongodb://localhost:27017/sintetizador',  {
         useNewUrlParser: true, 
         useUnifiedTopology: true 
        })
    .then(db => console.log('Conectado a la Base de Datos'))
    .catch(error => console.error(error));

   








