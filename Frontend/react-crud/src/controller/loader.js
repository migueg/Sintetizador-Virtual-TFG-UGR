
import DbFetcher from './dbFetcher'
class Loader extends DbFetcher {
    #method
    constructor(){
        super()
        this.#method = 'GET'
        //this.fetchCategories = this.fetchCategories.bind(this)
    }

    async __fetchUrl(url,requestOptions){
        var status;
        var that = this ;

        try{
            const resp =  await fetch(url,requestOptions)
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

    async fetchStates(){
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization': 'Migue'
            }
        }
      
        console.log( await this.__fetchUrl('http://localhost:8080/states',requestOptions));
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