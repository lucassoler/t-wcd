export default class Template {
    constructor(private _id:string,
                private _name:string) {

    }

    public get id():string {
        return this._id;
    }
    public get name():string {
        return this._name;
    }

    public set name(name:string) {
        this._name = name;
    }
};
