export default class Field {
    constructor(private _id:string,
                private _name:string,
                private _type:string,
                private _required:boolean,
                private _parentId:string | null) {

    }

    public get id():string {
        return this._id;
    }

    public get name():string {
        return this._name;
    }

    public get type():string {
        return this._type;
    }

    public get required():boolean {
        return this._required;
    }

    public get parentId():string | null{
        return this._parentId;
    }

    hasParent():boolean {
        if (this._parentId) return true;
        return false;
    }
};
