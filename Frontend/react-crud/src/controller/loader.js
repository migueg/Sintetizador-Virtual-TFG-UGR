
import DbFetcher from './dbFetcher'
class Loader extends DbFetcher {
    #method
    constructor(){
        super()
        this.#method = 'GET'
        //this.fetchCategories = this.fetchCategories.bind(this)
    }

     async fetchCategories(){
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization': 'Migue'
            }
        }
        var categories;
        var that = this ;

        try{
            const resp =  await fetch('http://localhost:8080/categories',requestOptions)
            .then(function(response){
                categories = that.handleStatus(response.status);
                if(categories){
                    return response.json();
                }else{
                    return false;
                }
                
            
            })
            .then((data)=>{
                if(data){
                    that.data = data.categories;
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

  
}

export default Loader;