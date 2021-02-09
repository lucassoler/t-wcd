import Template from "../../domain/entities/Template";
import TemplateDTO from "./TemplateDTO";

export class TemplatePresenter {
    static present(template:Template): TemplateDTO {
        return {
            id: template.id,
            name: template.name
        };
    }
}