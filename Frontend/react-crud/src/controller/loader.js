
import DbFetcher from './dbFetcher'
class Loader extends DbFetcher {
    #method
    constructor(){
        super()
        this.#method = 'GET'
        //this.fetchCategories = this.fetchCategories.bind(this)
    }

    getMetadata(){

    }
    getEffect(){

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
                'Authorization': 'Migue'
            }
        }
      
        return await this.__fetchUrl('http://localhost:8080/categories',requestOptions);
        
       
    }

    async fetchState(id){
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization': 'Migue'
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
                'Authorization': 'Migue'
            }
        }
      
       return await this.__fetchUrl('http://localhost:8080/states/metadata',requestOptions);
    }
}

export default Loader;