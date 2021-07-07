
import DbFetcher from './dbFetcher'

/**
 * La clase Loader contiene  las peticiones de tipo GET realizadas
 * al Backend
 *
 * @class Loader
 * @constructor
 * 
 * 
 */

/**
 * Método HTTP
 * 
 * @property method
 * @type String
 * @private
 */

/**
 * Perfil
 * 
 * @property profile
 * @type Objet
 * 
 */

/**
 * Tamaño máximo
 * 
 * @property maxSize
 * @type Object
 * 
 */
class Loader extends DbFetcher {
    #method
    constructor(){
        super()
        this.#method = 'GET'
        
        this.profile = {}
        this.maxSize= {}
        //this.fetchCategories = this.fetchCategories.bind(this)
    }

    /**
     * Realiza una petición para obtener el tamaño máximo de almacenamiento
     * disponible para un usuario
     * 
     * @method fetchMaxSize
     * @returns {Object} Tamaño máximo
     * @async
     */
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
    /**
     * Realiza una petición para obtener el perfil de un usuario
     * 
     * @method fetchProfile
     * @returns {Object} Perfil
     * @async
     */
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

    /**
     * Realiza una petición a la URL pasada como parámetro
     * 
     * @method fetchUrl
     * @param {String} url URL a la que se realiza la petición
     * @param {Object} requestOptions Opciones de la petición
     * @returns {Object} respuesta
     * @private
     * @async
     */
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

    /**
     * Realiza una petición para obtener las categorías
     * 
     * @method fetchCategories
     * @returns {Object} Categorías
     * @async
     */
     async fetchCategories(){
        const requestOptions = {
            method: this.#method,
            headers: {
                'Authorization':   this.getCookie('token')
            }
        }
      
        return await this.__fetchUrl('http://localhost:8080/categories',requestOptions);
        
       
    }

    /**
     * Realiza una petición para obtener un sonido
     * 
     * @method fetchCategories
     * @param {String} id Identificador del sonido
     * @returns {Object} Sonido
     * @async
     */
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

    /**
     * Realiza una petición para obtener los metadatos de los sonidos
     * 
     * @method fetchStatesMetadata
     * @returns {Object} Sonidos
     * @async
     */
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