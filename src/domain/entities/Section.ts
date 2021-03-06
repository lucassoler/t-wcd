export default class Section {
    constructor(private _id:string,
                private _name:string,
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

    public set name(name:string) {
        this._name = name;
    }

    hasParent():boolean {
        if (this._parentId) return true;
        return false;
    }
};
