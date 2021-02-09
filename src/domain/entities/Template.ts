import SectionBuilder from "../../application/builders/sectionBuilder";
import Field from "./Field";
import Section from "./Section";

export default class Template {
    constructor(private _id:string,
                private _name:string,
                private _sections:Section[],
                private _fields:Field[]) {

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
    public get sections():Section[] {
        return this._sections;
    }

    addNewSection(id:string, name:string, parentId:string | null) {
        const section:Section = new SectionBuilder().withId(id).withName(name).withParentSectionId(parentId).build();
        this._sections.push(section);
    }

    findSection(id:string):Section {
        const section:Section | undefined = this._sections.find(section => section.id === id);
        if (!section) throw new Error("section not founded");
        return section;
    }

    addNewField(id:string, name:string, type:string, parentId:string | null) {
        const field:Field = new Field(id, name, type, parentId);
        this._fields.push(field);
        return field;
    }
};
