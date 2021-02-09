import Field from "../../domain/entities/Field";
import FieldDTO from "./FieldDTO";

export class FieldPresenter {
    static present(field:Field): FieldDTO {
        return {
            id: field.id,
            name: field.name,
            type: field.type,
            parentId: field.parentId
        };
    }
}