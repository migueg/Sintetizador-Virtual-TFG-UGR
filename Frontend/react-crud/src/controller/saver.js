import Cookies from 'js-cookie';
import DbFetcher from './dbFetcher';
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

    }

    __getEnvelopes(){
        this.#envelopes['A'] = this.#oscillatorA.getEnvelope();
        this.#envelopes['B'] = this.#oscillatorB.getEnvelope(); 
    }

    __getOscillators(){
        
        this.#oscilators['A'] = this.#oscillatorA.getState();
        this.#oscilators['B'] = this.#oscillatorB.getState();

        this.__getEnvelopes();
        this.#oscilators['A']['envelope'] = this.#envelopes['A'];
        this.#oscilators['B']['envelope'] = this.#envelopes['B'];

        

    }

    __getEffects(){
        this.#oscilators['effects'] = this.#synth.getEffects();
    }

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

   
}

export default Saver;