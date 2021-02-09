import Usecase from "../../common/Usecase";
import Template from "../../domain/entities/Template";
import TemplateRepository from "../../domain/repositories/TemplateRepository";

export default class TemplateUpdating extends Usecase {
    constructor(private templateRepository:TemplateRepository) {
        super();
    }

    async Execute(id:string, name:string){
        try {
            if (name === '') {
                throw new Error('name is required');
            }

            const template:Template = await this.templateRepository.get(id);

            template.name = name;

            await this.templateRepository.save(template);
            
            return this.succeed(template);
        } catch (error) {
            return this.failure(error);
        }
    }
}