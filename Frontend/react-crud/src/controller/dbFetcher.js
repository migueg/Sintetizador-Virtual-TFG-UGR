class DbFetcher {
    constructor(){
        this.data = null;
        this.codes = {
            created: 201,
            ok: 200,
            error: 500,
            notFound: 404
        }
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