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
                        res.status(201);
                        res.send({message: "Notas insertadas"});
                    }
                })
            }else{
                res.status(304); //Not modified
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
    res.status(200);
    res.send(response);
    
}
function createOscillator(osc,en,id){
    const envelope = new statesModels.envelopeModel({
        attack: en.attack,
        release: en.release,
        sustain: en.sustain,
        decay: en.decay
    });

    const oscillator = new statesModels.oscillatorModel({ 
        id: id,
        oscOn:  osc.on,
        pan: osc.pan,
        gain: osc.gain,
        wave: osc.wave,
        envelope: envelope
     })

     return oscillator;
}

async function saveStateInBD(state){
    var saved = false;
    await state.save(function(err){
        if(err){
            console.error("Error al insertar en BD");
        }else{
            saved = true;
        }
    });

    return saved;
}

function saveState(req,res){
    
    if(req.header('Authorization') === 'Migue'){
        var bodyState = req.body.state;
        var oscA = bodyState.A;
        var enA = oscA.envelope;
        var oscB = bodyState.B;
        var enB= oscB.envelope;
        
        var del = bodyState.effects.delay;
        var dis = bodyState.effects.distorsion;
        var fil = bodyState.effects.filter;
        var rev = bodyState.effects.reverb;

        //console.log(state)
        const oscillatorA = createOscillator(oscA,enA,'A');

        const oscillatorB = createOscillator(oscB,enB,'B');
         
        const delay = new statesModels.delayModel({
            effectOn: del.on,
            wet: del.wet,
            time: del.time,
            feedback: del.feedback
        });

        const distorsion = new statesModels.distorsionModel({
            effectOn: dis.on,
            wet: dis.wet,
            amount: dis.amount,
            
        });

        const filter = new statesModels.filterModel({
            effectOn: fil.on,
            wet: fil.wet,
            type: fil.type,
            frequency: fil.frequency
        });

        const reverb = new statesModels.reverbModel({
            effectOn: rev.on,
            wet: rev.wet,
            hp: rev.hp,
            lp: rev.lp,
            decay: rev.decay
        });

        const state = new statesModels.stateModel({
             oscA: oscillatorA,
             oscB: oscillatorB,
             delay: delay,
             distorsion: distorsion,
             filter: filter,
             reverb: reverb   
         });

         var success = saveStateInBD(state);

         if(success){
             res.status(201) // created;
             res.send({msg: 'Sonido almacenado con exito'});
         }else{
             res.status(500) // server errors
             res.send({msg: 'Error al guardar el sonido en BD'});
         }
         
    }else{
        console.log('error');
    }
}
module.exports = {
    createNotes,
    getNotes,
    saveState
}