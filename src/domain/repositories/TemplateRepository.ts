import Template from "../entities/Template";

export default interface TemplateRepository {
    nextId():string;
    add(template:Template):Promise<Template>;
    get(id:string):Promise<Template>;
    save(template:Template):Promise<Template>;
}