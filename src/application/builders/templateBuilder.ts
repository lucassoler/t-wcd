import Field from "../../domain/entities/Field";
import Section from "../../domain/entities/Section";
import Template from "../../domain/entities/Template";

export default class TemplateBuilder {
    protected _id:string;
    protected _name:string;
    protected _sections:Section[] = [];
    protected _fields:Field[] = [];

    withId(id:string):TemplateBuilder {
        this._id = id;
        return this;
    }
    
    withName(name:string):TemplateBuilder {
        this._name = name;
        return this;
    }

    withSections(sections:Section[]):TemplateBuilder {
        this._sections = sections;
        return this;
    }

    build() {
        return new Template(this._id, this._name, this._sections, this._fields);
    }
}