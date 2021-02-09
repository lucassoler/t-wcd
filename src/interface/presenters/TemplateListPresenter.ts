import Template from "../../domain/entities/Template";
import TemplateListDTO from "./TemplateListDTO";

export class TemplateListPresenter {
    static present(template:Template): TemplateListDTO {
        return {
            id: template.id,
            name: template.name
        };
    }
}