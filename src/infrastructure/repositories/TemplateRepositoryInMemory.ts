import Template from "../../domain/entities/Template";
import TemplateRepository from "../../domain/repositories/TemplateRepository";
import { v4 as uuidv4 } from 'uuid';

export default class TemplateRepositoryInMemory implements TemplateRepository {
    constructor(private templates:Template[]) {

    }

    nextId():string {
        return uuidv4();
    }

    async add(template:Template):Promise<Template> {
        this.templates.push(template);

        return Promise.resolve(template);
    }

    async get(id:string):Promise<Template> {
        const template:Template | undefined = this.templates.find(template => template.id === id);

        if (!template) throw new Error("template not founded");
        
        return Promise.resolve(template);
    }

    async save(template:Template):Promise<Template> {
        return Promise.resolve(template);
    }
};
