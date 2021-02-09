import Usecase from "../../common/Usecase";
import Template from "../../domain/entities/Template";
import TemplateRepository from "../../domain/repositories/TemplateRepository";

export default class TemplateGet extends Usecase {
    constructor(private templateRepository:TemplateRepository) {
        super();
    }

    async Execute(id:string){
        try {
            const template:Template = await this.templateRepository.get(id);
            
            return this.succeed(template);
        } catch (error) {
            return this.failure(error);
        }
    }
}