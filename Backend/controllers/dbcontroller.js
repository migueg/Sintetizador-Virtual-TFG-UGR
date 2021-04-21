const Notes = require ('../models/notes');
const notesMap  = require('../data/notes');
const statesModels = require('../models/states');


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

async function saveState(req,res){
    
    if(req.header('Authorization') === 'Migue'){
        var state = req.body.state;
        var oscA = state.A;
        var enA = oscA.envelope;
        var oscB = state.B;

        const envelopeA = new statesModels.envelopeModel({
            attack: enA.attack,
            release: enA.release,
            sustain: enA.sustain,
            decay: enA.decay
        });

        const oscillatorA = new statesModels.oscillatorModel({ 
            id: 'A',
            oscOn:  oscA.on,
            pan: oscA.pan,
            gain: oscA.gain,
            wave: oscA.wave,
            envelope: envelopeA
         })

         var state = new statesModels.stateModel({
             oscA: oscA
         })
         console.log(state.oscA.envelope)
    }else{
        console.log('error');
    }
}
module.exports = {
    createNotes,
    getNotes,
    saveState
}