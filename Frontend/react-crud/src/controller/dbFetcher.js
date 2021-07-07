import Cookies from 'js-cookie';

/**
 * La clase DbFetcher contiene el comportamiento común en las peticiones
 * al Backend
 *
 * @class Analyser
 * @constructor
 * 
 * 
 */


/**
 * Token de autorización
 * @property token
 * @type String
 * @private
 */

/**
 * Nombre de usuario
 * @property user
 * @type String
 * @private
 */
class DbFetcher {
    #token
    #user
    constructor(){
        this.data = null;
        this.codes = {
            created: 201,
            ok: 200,
            error: 500,
            notFound: 404,
            conflict: 409
        }

        this.#token = '';
        this.#user = '';
    }

    /**
     * Setter del token 
     * 
     * @method setToken
     * @param {String} token 
     */
    setToken(token){
        this.#token = token;

    }
    /**
     * Cambia las cookies almacenadas
     * 
     * @method changeCookie
     * @param {String} cookie Cookie a cambiar
     * @param {String} value Nuevo valor
     */
    changeCookie(cookie,value){
        Cookies.remove(cookie)
        Cookies.set(cookie,value)
    }
    
    /**
     * Getter del valor de una cookie
     * 
     * @method getCookie
     * @param {String} cookie Cookie a devolver
     * @returns {String} Cookie
     */
    getCookie(cookie){
        return Cookies.get(cookie)
    }

    /**
     * Setter del nombre de usuario
     * 
     * @method setUser
     * @param {String} user Nombre de usurario
     */
    setUser(user){
        this.#user = user
    }

    /**
     * Getter del nombre de usuario
     * 
     * @method getUser
     * @returns {String} user Nombre de usurario
     */
    getUser(){
        return this.#user
    }

    /**
     * Getter del token
     * 
     * @method getToken
     * @returns {String} token
     */
    getToken(){
        return this.#token;
    }

    /**
     * Interpreta el código de respuesta de las peticiones
     * 
     * @method handleStatus
     * @param {Integer} status código
     * @returns {Boolean}
     */
    handleStatus(status){
        switch(status){
            case this.codes.created:
                return true;
            case this.codes.ok:
                return true;
            case this.codes.error:
                return false;
            case this.codes.notFound:
                return false;
            case this.codes.conflict:
                return false;
            default:
                break;
        }
    }
}

export default DbFetcher;