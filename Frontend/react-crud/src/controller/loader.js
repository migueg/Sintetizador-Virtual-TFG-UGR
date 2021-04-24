
import DbFetcher from './dbFetcher'
class Loader extends DbFetcher {
    #method
    constructor(){
        super()
        this.#method = 'GET'
        //this.fetchCategories = this.fetchCategories.bind(this)
    }

     fetchCategories(){
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization': 'Migue'
            }
        }
        var categories;
        var that = this ;
         fetch('http://localhost:8080/categories',requestOptions)
        .then(function(response){
            categories = that.handleStatus(response.status);
            return response.json()
           
        })
        .then(function(data){
            console.log(data)
        })
       

        
        return categories
    }
}

export default Loader;