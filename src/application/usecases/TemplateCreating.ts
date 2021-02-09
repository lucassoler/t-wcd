import Usecase from "../../common/Usecase";
import Template from "../../domain/entities/Template";
import TemplateRepository from "../../domain/repositories/TemplateRepository";

export default class TemplateCreating extends Usecase {
    constructor(private templateRepository:TemplateRepository) {
        super();
    }

    async Execute(name:string){
        try {
            if (name === '') {
                throw new Error('name is required');
            }

            const template:Template = new Template(this.templateRepository.nextId(), name);

            await this.templateRepository.add(template);
            
            return this.succeed(template);
        } catch (error) {
            return this.failure(error);
        }
    }
}