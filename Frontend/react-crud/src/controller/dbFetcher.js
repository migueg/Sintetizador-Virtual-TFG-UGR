class DbFetcher {
    #token
    #user
    constructor(){
        this.data = null;
        this.codes = {
            created: 201,
            ok: 200,
            error: 500,
            notFound: 404
        }

        this.#token = '';
        this.#user = '';
    }

    
    setToken(token){
        this.#token = token;

    }
    setUser(user){
        this.#user = user
    }

    getUser(){
        return this.#user
    }
    getToken(){
        return this.#token;
    }
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
            default:
                break;
        }
    }
}

export default DbFetcher;