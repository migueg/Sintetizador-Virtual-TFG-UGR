class DbFetcher {
    constructor(){
        this.codes = {
            created: '201',
            ok: '200',
            error: '500'
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
        }
    }
}

export default DbFetcher;