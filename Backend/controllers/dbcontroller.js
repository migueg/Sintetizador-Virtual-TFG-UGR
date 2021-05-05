const Notes = require ('../models/notes');
const categories = require('../data/categories');
const notesMap  = require('../data/notes');
const statesModels = require('../models/states');
const { response } = require('express');
const bson = new (require('bson'))();


/********* MÉTODOS AUXILIARES *************/
function sendResponse(res,code,msg){
    res.status(code) // server errors
    res.setHeader('Content-type','application/json');
    res.send({msg: msg});
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


/********* MÉTODOS ASINCRONOS *************/
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
                        sendResponse(res,'201',"Notas insertadas");
                    }
                })
            }else{
                sendResponse(res,'200',"Ya existen notas en la base de datos");
               
            }
        }

    })
}   

async function createCategories(req,res){
    statesModels.categoryModel.find({category: 'PAD'},function(err,docs){
        if(err){
            console.error(err);
            sendResponse(res,'500',err);
        }else{
            if(docs.length === 0){
                statesModels.categoryModel.collection.insertMany(categories,function(err,docs){
                    if(err){
                        console.error(err);
                        sendResponse(res,'500',err);
                    }else{
                        sendResponse(res,'201','Categorías creadas con éxito')
                    }
                })
            }else{
                sendResponse(res,'200','Las categorías estaban ya creadas')
            }
        }
    });
}

async function getCategories(req,res){
    var cts ;
    await statesModels.categoryModel.find({},function(err,docs){
        if(err){
            sendResponse(res,'500','Error al obtener las categorías')
            
        }else{
            cts = docs;
        }
    });
    
    if(cts){
        var cArray = [];

        (await cts).forEach(function(category){
            cArray.push(category.category);
        });
        
        sendResponse(res,'200',cArray);
    }
    
}
async function getNotes(req,res){
    var notes = Notes.find();
    var noteMap = {};
    (await notes).forEach(function(note){
        noteMap[note.key] = note.value
        
        
    })
    var response = {notes: [ noteMap ]}
    res.status(200);
    res.setHeader('Content-type','application/json');
    res.send(response);
    
}


async function getState(req,res){
    var id = req.header('Authorization')
    var select = 'name delay distorsion filter oscA oscB reverb'
    if(req.params.id){
        await statesModels.stateModel.find({userID: id, name: req.params.id}, select, function(err,docs){
            if(err){
                sendResponse(res,'500','Error al obtener los sonidos');
            }else{
                if(docs.length !== 0){
                    sendResponse(res,'200',docs);
                }else{
                    sendResponse(res,'404','El sonido no se ha encontrado en BD')
                }
            }
        })
    }else{
        sendResponse(res,'400','Petición incorrecta');
    }
    
}

async function getStatesMetaData(req,res){
    var id = req.header('Authorization')
    
    await statesModels.stateModel.find({userID: id}, 'name  description category value ' , function(err,docs){
        if(err){
            sendResponse(res,'500','Error al obtener los sonidos');
        }else{
            sendResponse(res,'200',docs);
            
        }
    })
}



 async function checkSpace(id){
    var response;
    await statesModels.stateModel.find({userID: id}, function(err,docs){
        if(err){
            console.error(err)
        }else{
            response = bson.calculateObjectSize(docs)  //Devuelve el tamaño en bytes
        }
    })

    
    console.log(response)
}
async function saveStateInBD(state,res){
    
        const resp = await state.save( function(err){
            if(err){
                sendResponse(res,'500','Error al guardar el sonido en BD')
            }else{
                checkSpace(state.userID)
                sendResponse(res,'201','Sonido almacenado con exito');
                console.log('Nuevo sonido almacenado para: ' + state.userID)
            }
        })
    
}

async function saveState(req,res){
    
    if(req.header('Authorization') === 'Migue'){
        var bodyState = req.body.state;
        var oscA = bodyState.A;
        var enA = oscA.envelope;
        var oscB = bodyState.B;
        var enB= oscB.envelope;
        var data = req.body.data;

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
        var category = {
            category: data.category
        }
    
        const state = new statesModels.stateModel({
             name: data.name,
             userID: req.header('Authorization'),
             description: data.description,
             category: category,
             value: data.valoration,
             oscA: oscillatorA,
             oscB: oscillatorB,
             delay: delay,
             distorsion: distorsion,
             filter: filter,
             reverb: reverb   
         });

         await saveStateInBD(state,res);
         
    }else{
        console.error('ERROR INTERNO DEL SERVIDOR');
        sendResponse(res,'500','ERROR INTERNO DEL SERVIDOR')
    }
}


module.exports = {
    createNotes,
    getCategories,
    getNotes,
    saveState,
    createCategories,
    getState,
    getStatesMetaData
}