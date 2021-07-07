import DbFetcher from './dbFetcher';
import { oscillator } from './oscillator';

/**
 * La clase Saver contiene  las peticiones de tipo POST y DELETE realizadas
 * al Backend
 *
 * @class Saver
 * @constructor
 * @param {oscillator} oscA
 * @param {oscillator} oscB
 * @param {synth} synth
 * 
 * 
 */
/**
 * 
 * @property envelopes
 * @type Object
 */

/**
 * 
 * @property oscilators
 * @type Object
 */

/**
 * 
 * @property oscilatorA
 * @type oscillator
 */

/**
 * 
 * @property oscilatorB
 * @type oscillator
 */

class Saver extends DbFetcher {
    #envelopes
    #oscilators
    #synth;
    #effects
    #oscillatorA
    #oscillatorB

    constructor(oscA,oscB,synth){
        super();
        this.#envelopes = {};
        this.#oscilators = {};
        this.#effects = {};
        this.#oscillatorA = oscA;
        this.#oscillatorB = oscB;
        this.#synth = synth;
        
        this.edit = {}
        this.deleteSound = {}

    }

    /**
     * Obtiene la información de las envolventes
     * 
     * @method getEnvelopes
     * @private
     */
    __getEnvelopes(){
        this.#envelopes['A'] = this.#oscillatorA.getEnvelope();
        this.#envelopes['B'] = this.#oscillatorB.getEnvelope(); 
    }

    /**
     * Obtiene la información de los osciladores
     * 
     * @method getOscillators
     * @private
     */
    __getOscillators(){
        
        this.#oscilators['A'] = this.#oscillatorA.getState();
        this.#oscilators['B'] = this.#oscillatorB.getState();

        this.__getEnvelopes();
        this.#oscilators['A']['envelope'] = this.#envelopes['A'];
        this.#oscilators['B']['envelope'] = this.#envelopes['B'];

        

    }

    /**
     * Obtiene la información de los efectos
     * 
     * @method getEffects
     * @private
     */
    __getEffects(){
        this.#oscilators['effects'] = this.#synth.getEffects();
    }

    /**
     * Manda una petición para guardar un sonido
     * 
     * @method sendRequest
     * @param {Object} toSave 
     * @private
     */
    async __sendRequest(toSave){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.getToken(),
                'Type': 'deafault-save'
            },
            body: JSON.stringify(toSave)
        };

        var that = this;
        try{
            await fetch('http://localhost:8080/save/Migue',requestOptions)
            .then(function(response){
                var status = that.handleStatus(response.status);
                if(status){
                    return response.json();
                }else{
                    return false
                }
            })
            .then((data) =>{
                if(data){
                    that.data = {
                        state: true,
                        msg: data.msg
                    }
                }else{
                    that.data = {
                        state: false,
                        msg: data.msg
                    }
                }
            });
        }catch(err){
            that.data = {
                state: false,
                msg: err
            };
            console.error(err);
        }
    
        
    }

    /**
     * Se encarga de recopilar la información de los sonidos y 
     * dar orden para mandar la petición de guardado
     * 
     * @method save
     * @param {Object} data 
     * @returns {Object} Respuesta del servidor
     * @async
     */
    async save(data){
        this.__getOscillators();
        this.__getEffects();
    
        var toSave = {};
        toSave['data'] = data
        toSave['state'] = this.#oscilators;
        toSave['user'] = this.getUser();
        
        await this.__sendRequest(toSave);
        
        return this.data
    }

    /**
     * Manda una petición para editar el perfil de usuario
     * 
     * @method editProfile
     * @param {Object} data 
     * @returns {Object} Respuesta del servidor
     * @async
     */
    async editProfile(data){
        var that = this
        var d = data;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  this.getCookie('token'),
                'User': this.getCookie('user')
            },
            body: JSON.stringify(data)
        }
        try{
            await fetch('http://localhost:8080/edit',requestOptions)
            .then(function(response){
                that.edit.state = that.handleStatus(response.status)
                if(that.edit.state){
                    if(d.username){
                        that.edit.username = d.username
                    }
                }else{
                    that.edit.code = response.status
                }
                return response.json();
            })
            .then((data)=>{
                that.edit.msg = data.msg
            })
        }catch(err){
            that.edit.state = false;
            that.edit.msg = err;

        }

        if(this.edit.state){
            if(this.edit.username){
                this.changeCookie('user',this.edit.username)
            }
        }

        return this.edit
    }

    /**
     * Manda una petición para editar la contraseña de usuario
     * 
     * @method editPassword
     * @param {Object} data 
     * @returns {Object} Respuesta del servidor
     * @async
     */
   async editPassword(data){
    var that = this
    var d = data;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  this.getCookie('token'),
            'User': this.getCookie('user')
        },
        body: JSON.stringify(data)
    }
    try{
        await fetch('http://localhost:8080/password',requestOptions)
        .then(function(response){
            that.edit.password = that.handleStatus(response.status)
            
            return response.json();
        })
        .then((data)=>{
            that.edit.msg = data.msg.msg

            if(that.edit.password){
                that.edit.token = data.msg.token;
            }
        })
    }catch(err){
        that.edit.password = false;
        that.edit.msg = err;

    }

    if(this.edit.token){
        this.changeCookie('token',this.edit.token)
    }

    return {state: this.edit.password, msg: this.edit.msg}
   }

    /**
     * Manda una petición para borrar un sonido
     * 
     * @method delete
     * @param {String} id Identificador del sondio 
     * @returns {Object} Respuesta del servidor
     * @async
     */
   async delete(id){
       if(id){
            var that = this
            var soundId = id
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization':  this.getCookie('token'),
                    'User': this.getCookie('user')
                },
                
            }
            try{
                await fetch('http://localhost:8080/delete/'+soundId,requestOptions)
                .then(function(response){
                    that.deleteSound.state = that.handleStatus(response.status)
                    
                    return response.json();
                })
                .then((data)=>{
                    that.deleteSound.msg = data.msg
        
        
                })
            }catch(err){
                that.deleteSound.state = false;
                that.deleteSound.msg = err;
        
            }
        
       }else{
           this.deleteSound.state = false;
           this.deleteSound.msg = 'No podemos identificar el sonido'
       }

       return this.deleteSound;
   }
}

export default Saver;