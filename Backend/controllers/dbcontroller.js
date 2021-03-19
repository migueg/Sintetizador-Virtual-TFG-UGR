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
                        console.error(err)
                        return({error: err} );
                    }else{
                        console.log('Aqui')
                        res.send({message: "Notas insertadas"});
                    }
                })
            }else{

                res.send({message: "ya existen notas en la base de datos"})
               
            }
        }

    })
}   


async function getNotes(req,res){
    var notes = Notes.find();
    var noteMap = {};
    (await notes).forEach(function(note){
        noteMap[note.key] = note.value
        
        
    })
    var response = {notes: [ noteMap ]}
    res.send(response);
    
}
module.exports = {
    createNotes,
    getNotes
}