import Usecase from "../../common/Usecase";
import Template from "../../domain/entities/Template";
import TemplateRepository from "../../domain/repositories/TemplateRepository";

export default class TemplateListing extends Usecase {
    constructor(private templateRepository:TemplateRepository) {
        super();
    }

    async Execute(){
        try {
            const templates:Template[] = await this.templateRepository.all();
            
            return this.succeed(templates);
        } catch (error) {
            return this.failure(error);
        }
    }
}