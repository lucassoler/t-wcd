import Usecase from "../../common/Usecase";
import Template from "../../domain/entities/Template";
import TemplateRepository from "../../domain/repositories/TemplateRepository";

export default class SectionCreating extends Usecase {
    constructor(private templateRepository:TemplateRepository) {
        super();
    }

    async Execute(templateId:string, name:string, parentId:string | null = null){
        try {
            if (name === '') {
                throw new Error('name is required');
            }

            const template:Template = await this.templateRepository.get(templateId);
            template.addNewSection(this.templateRepository.nextSectionId(), name, parentId);
            
            return this.succeed(template);
        } catch (error) {
            return this.failure(error);
        }
    }
}