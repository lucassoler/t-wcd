import Usecase from "../../common/Usecase";
import Field from "../../domain/entities/Field";
import Section from "../../domain/entities/Section";
import Template from "../../domain/entities/Template";
import TemplateRepository from "../../domain/repositories/TemplateRepository";

const FIELD_TYPES:string[] = ['string', 'number', 'list'];

export default class FieldCreating extends Usecase {
    constructor(private templateRepository:TemplateRepository) {
        super();
    }

    async Execute(templateId:string, name:string, type:string, parentId:string | null = null){
        try {
            this.verifyForm(name, type);
            const template:Template = await this.fetchTemplate(templateId);
            this.fetchSection(parentId, template);
            const field:Field = template.addNewField(this.templateRepository.nextFieldId(), name, type, parentId);
            return this.succeed(field);
        } catch (error) {
            return this.failure(error);
        }
    }

    private fetchSection(parentId: string | null, template: Template) {
        let section: Section | null = null;
        if (parentId) {
            section = template.findSection(parentId);
        }
    }

    private async fetchTemplate(templateId: string) {
        return await this.templateRepository.get(templateId);
    }

    private verifyForm(name: string, type: string) {
        if (name === '') {
            throw new Error('name is required');
        }

        if (type === '') {
            throw new Error('type is required');
        }

        if (!FIELD_TYPES.find(authorizedTypes => authorizedTypes === type)) {
            throw new Error('invalid type');
        }
    }
}