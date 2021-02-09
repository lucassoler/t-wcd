export default class Field {
    constructor(private _id:string,
                private _name:string,
                private _type:string,
                private _parentId:string | null) {

    }

    public get id():string {
        return this._id;
    }

    public get name():string {
        return this._name;
    }

    public get parentId():string | null{
        return this._parentId;
    }
};
