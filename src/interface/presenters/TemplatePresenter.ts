import Template from "../../domain/entities/Template";
import FieldDTO from "./FieldDTO";
import { FieldPresenter } from "./FieldPresenter";
import SectionDTO from "./SectionDTO";
import { SectionPresenter } from "./SectionPresenter";
import TemplateDTO from "./TemplateDTO";

export class TemplatePresenter {
    static present(template:Template): TemplateDTO {
        const fields:FieldDTO[] = [];
        const sections:SectionDTO[] = [];

        for (let i = 0; i < template.sections.length; i++) {
            const section = template.sections[i];
            sections.push(SectionPresenter.present(section));
        }
        for (let i = 0; i < template.fields.length; i++) {
            const field = template.fields[i];
            fields.push(FieldPresenter.present(field));
        }

        return {
            id: template.id,
            name: template.name,
            fields: fields,
            sections: sections
        };
    }
}