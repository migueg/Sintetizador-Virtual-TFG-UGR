const Notes = require ('../models/notes');
const notesMap  = require('../data/notes');


async function createNotes(req,res){
    Notes.find({key: 'C1'},function (err,docs){
        if(err){
            console.log(err)
           
  
        }else{
            //Se hace esta comprobación para que no se reinserten datos
            if(docs.length === 0){ 
                var notesM = notesMap 
                 Notes.collection.insert(notesM,function(err,docs){
                    if(err){
                        console.error.bind(console,err)
                    }else{
                        console.log("Notas insertadas en la BD")
                    }
                })
            }else{
                console.log("ya existen notas en la base de datos")
            }
        }
    })
}   


module.exports = {
    createNotes
}