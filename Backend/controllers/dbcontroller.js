const Notes = require ('../models/notes');
const userModel = require('../models/users');
const jwt = require("jsonwebtoken");

const categories = require('../data/categories');
const notesMap  = require('../data/notes');
const statesModels = require('../models/states');
const bson = new (require('bson'))();

const SIGN = "f8b9afc6-f34f-490f-9353-22dfbc5edc9b"

/********* MÉTODOS AUXILIARES *************/

function checkJwtToken(auth){
    const token = auth;

    return jwt.verify(token, SIGN,function(err,user){
            if(err){
                return false;
            }
            return true;
        })

}
async function checkSpace(id){
    var response
    await statesModels.stateModel.find({userID: id}, function(err,docs){
        if(err){
            console.error(err)
        }else{
            response =   bson.calculateObjectSize(docs)  //Devuelve el tamaño en bytes
        }
    });

   
    
   return   response
}
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

function bytesToMB(bytes){
    var kb = bytes /1024;
    var mb = kb / 1024;
    
    return mb;
}


/********* MÉTODOS PRINCIPALES *************/
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

async function login(req,res){
    if(req.body.user && req.body.user.username && req.body.user.password){
        var user = req.body.user;
        const resp = await userModel.findOne({username: user.username}).exec(function(error,u){
            
            if(error){
                sendResponse(res,'500','Error interno del servidor');
            }else if(!u){
                sendResponse(res,'400','Usuario no registrado');
            }else{
                u.checkPassword(user.password,function(isMatch){
                    if(isMatch){
                        const token = jwt.sign({username: u.username, role: u.role},SIGN); //generamos el token
                        sendResponse(res, '200', {token: token, user: u.username}, )
                    
                    }else{
                        sendResponse(res,'400', 'Contraseña incorrecta')

                    }
                })

              
    
            }
        })
    }else{
        sendResponse(res,'400','Petición incorrecta')
    }
    
    
}

async function editPassword(req,res){
    if(checkJwtToken(req.header('Authorization'))){
        var id = req.header('User');
        var password = req.body.password
        if(id && password){
            await userModel.findOne({username: id}).exec(function(err,user){
                if(err){
                    console.log(err)

                    sendResponse(res,'500' , err)
                }else{
                    var u = user;
                    user.changePassword(password,function(response){
                        if(response === 'success'){
                            const token = jwt.sign({username: u.username, role: u.role},SIGN);
                            sendResponse(res,'200',{token: token, msg:'Contraseña modificada con éxito'})
                        }else{
                            sendResponse(res,'500' , 'Erro al modificar la contraseña')
                        }
                    })
                }
                
            })

        }else{

            sendResponse(res,'400','Petición incorrecta')

        }
    }else{
        console.log('UNAUTHORIZED');
        sendResponse(res,'401','No estas autorizado')
    }
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

async function editProfile(req,res){
    if(checkJwtToken(req.header('Authorization'))){
        var id = req.header('User')
        var user = req.body.username
        var email = req.body.email;
        var date = req.body.date;

        var toUpdate = {};
        if(user){toUpdate.username = user}
        if(email){toUpdate.email = email}
        if(date){toUpdate.date = date}

        if(id){
            await userModel.findOne({username: id},function(err,docs){
                if(err){
                    sendResponse(res,'500','Error al editar el perfil');
                }else{
                    if(docs.length !== 0){
                        userModel.updateOne({username:id},toUpdate,function(err,docs){
                            if(err){
                                if(err.keyValue.username && !err.keyValue.email){
                                    sendResponse(res,'409','El nombre de usuario ya existe, prueba con otro'); //409 Conflict
                                }else if(err.keyValue.email && !err.keyValue.username){
                                    sendResponse(res,'409','Ya existe una cuenta registrada con ese email, prueba con otro'); //409 Conflict
                                }else if(err.keyValue.username && err.keyValue.email){
                                    sendResponse(res,'409','El nombre de usuario y el email ya esxiten, prueba con otros'); //409 Conflict

                                }else{
                                    sendResponse(res,'500','Error al editar el perfil');
                                }
                            }else{
                                if(docs.length !== 0){
                                    sendResponse(res,'200','Perfil editado con éxito');

                                }
                            }
                        })
                    }else{
                        sendResponse(res,'404', 'Usuario no encontrado');
                    }
                }
            })
        }else{
            sendResponse(res,'404', 'Petición incorrecta');
        }
    }else{
        console.log('UNAUTHORIZED');
        sendResponse(res,'401','No estas autorizado')
    }
}

const MAXSIZE = 100 //MB
async function getMaxSize(req,res){
    if(checkJwtToken(req.header('Authorization'))){
        sendResponse(res,'200',MAXSIZE)
    }else{
        console.log('UNAUTHORIZED');
        sendResponse(res,'401','No estas autorizado')
    }
}


async function getProfile(req,res){
    if(checkJwtToken(req.header('Authorization'))){
        var id = req.header('User');
        var select = "username email date created role"
        if(id){
            var size = await checkSpace(id)
            var sizeMB = bytesToMB(size)
            await userModel.findOne({username: id},select,function(err,docs){
                if(err){
                    sendResponse(res,'500','Error al obtener el perfil');
                }else{
                    if(docs){
                        if(docs.length !== 0){
                            
                            sendResponse(res,'200',{profile: docs, size: sizeMB});
                        }else{
                            sendResponse(res,'404','El perfil no se ha encontrado en BD')
                        }
                    }
                    
                }
            })
        }else{
            sendResponse(res,'400','Petición incorrecta');
        }
    }else{
        console.log('UNAUTHORIZED');
        sendResponse(res,'401','No estas autorizado')
    }
}
async function getState(req,res){
    if(checkJwtToken(req.header('Authorization'))){
        var id = req.header('User');
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
    }else{
        console.log('UNAUTHORIZED');
        sendResponse(res,'401','No estas autorizado')
    }
   
    
}

async function getStatesMetaData(req,res){
    var token = req.header('Authorization');
    if(checkJwtToken(token)){
        
        var id = req.header('User');
        await statesModels.stateModel.find({userID: id}, 'name  description category value ' , function(err,docs){
            if(err){
                sendResponse(res,'500','Error al obtener los sonidos');
            }else{
                sendResponse(res,'200',docs);
                
            }
        })
    }else{
        console.log('UNAUTHORIZED');
        sendResponse(res,'401','No estas autorizado')
    }
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
    
    if(checkJwtToken(req.header('Authorization'))){
        var bodyState = req.body.state;
        var oscA = bodyState.A;
        var enA = oscA.envelope;
        var oscB = bodyState.B;
        var enB= oscB.envelope;
        var data = req.body.data;
        var user = req.body.user;

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
             userID: user,
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
        console.log('UNAUTHORIZED');
        sendResponse(res,'401','No estas autorizado')
    }
}


async function registerUser(req,res){
    var user = req.body.user;
    var d = new Date();
    var date =  d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
    if(user.username){
        const userNew = new userModel({
            username: user.username,
            password: user.password,
            role: "user",
            email: user.email,
            date: user.date,
            created: date
        })

        userNew.save(function(err){
            if(err){
                if(err.keyValue.username){
                    sendResponse(res,'500','El nombre de usuario ya existe, prueba con otro');

                }else if(err.keyValue.email){
                    sendResponse(res,'500','Ya hay una cuenta registrada con ese correo. Introduce otro correo.');

                }else{
                    sendResponse(res,'500', 'Error interno del servidor');
                }
                
            }else{
                sendResponse(res,'201','Usuario registrado con éxito');

            }
        })
    }
}

module.exports = {
    createNotes,
    getCategories,
    getNotes,
    saveState,
    createCategories,
    getState,
    getStatesMetaData,
    registerUser,
    login,
    getProfile,
    editProfile,
    getMaxSize,
    editPassword
}