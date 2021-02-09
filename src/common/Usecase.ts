export default abstract class Usecase {
    error: Error | null;
    errors: Error[] | null;
    result: any;
    constructor() {
        this.error = null;
        this.errors = null;
        this.result = null;
    }
    protected succeed(result?:any):Promise<{error:Error | null, errors:Error[] | null, succeed:any}> {
        this.result = result;

        return this.sendResult();
    }

    protected failure (error:Error):Promise<{error:Error | null, errors:Error[] | null, succeed:any}> {
        this.error = error;

        return this.sendResult();
    }

    private sendResult():Promise<{error:Error | null, errors:Error[] | null, succeed:any}> {
        return Promise.resolve({
            error: this.error,
            errors: this.errors,
            succeed: this.result
        })
    }
}