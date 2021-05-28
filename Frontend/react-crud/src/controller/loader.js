
import DbFetcher from './dbFetcher'
class Loader extends DbFetcher {
    #method
    constructor(){
        super()
        this.#method = 'GET'
        
        this.profile = {}
        this.maxSize= {}
        //this.fetchCategories = this.fetchCategories.bind(this)
    }

    async fetchMaxSize(){
        var that = this
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization': this.getCookie('token'),
               
            }
        }

        try{
            await fetch('http://localhost:8080/maxSize',requestOptions)
            .then(function(response){
                that.maxSize.data = that.handleStatus(response.status)
                return response.json();
            })
            .then((data)=>{
                if(that.maxSize.data){
                    that.maxSize.msg = data.msg
                }else{
                    that.maxSize.msg = data.msg
                }
            })
        }catch(err){
            that.maxSize.data = false;

        }
        return this.maxSize;

    }
    async fetchProfile(){
        var that = this
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization': this.getCookie('token'),
                'User': this.getCookie('user')
            }
        }
        try{
            await fetch('http://localhost:8080/profile',requestOptions)
            .then(function(response){
                that.profile.data = that.handleStatus(response.status)
                return response.json();
            })
            .then((data)=>{
                if(that.profile.data){
                    that.profile.profile = data.msg
                }else{
                    that.profile.error = data.msg
                }
            })
        }catch(err){
            that.profile.data = false;

        }

        return this.profile;
    }
    async __fetchUrl(url,requestOptions){
        var status;
        var that = this ;

        try{
            await fetch(url,requestOptions)
            .then(function(response){
                status = that.handleStatus(response.status);
                if(status){
                    return response.json();
                }else{
                    return false;
                }
                
            
            })
            .then((data)=>{
                if(data){
                    that.data = data.msg;
                }else{
                    that.data = data;
                }
                
            });
            
        }catch(err){
            that.data = false;
            console.error(err)
        }

        return this.data
    }

     async fetchCategories(){
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization':   this.getCookie('token')
            }
        }
      
        return await this.__fetchUrl('http://localhost:8080/categories',requestOptions);
        
       
    }

    async fetchState(id){
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization':   this.getCookie('token'),
                'User':  this.getCookie('user')
            }
        }
        
        const rsp =  await this.__fetchUrl('http://localhost:8080/state/'+id,requestOptions);

        if(!rsp){
            return rsp
        }else{
            return rsp[0]
        }
    }

    async fetchStatesMetadata(){
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization':   this.getCookie('token'),
                'User':  this.getCookie('user')
            }
        }
      
       return await this.__fetchUrl('http://localhost:8080/states/metadata',requestOptions);
    }
}

export default Loader;