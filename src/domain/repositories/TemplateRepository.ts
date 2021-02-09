import Template from "../entities/Template";

export default interface TemplateRepository {
    nextId():string;
    nextSectionId():string;
    nextFieldId():string;
    add(template:Template):Promise<Template>;
    get(id:string):Promise<Template>;
    all():Promise<Template[]>;
    save(template:Template):Promise<Template>;
}