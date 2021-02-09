import Section from "../../domain/entities/Section";

export default class SectionBuilder {
    protected _id:string;
    protected _name:string;
    protected _parentSectionId:string | null;

    withId(id:string):SectionBuilder {
        this._id = id;
        return this;
    }
    
    withName(name:string):SectionBuilder {
        this._name = name;
        return this;
    }

    withParentSectionId(parentId:string | null):SectionBuilder {
        this._parentSectionId = parentId;
        return this;
    }

    build() {
        return new Section(this._id, this._name, this._parentSectionId);
    }
}