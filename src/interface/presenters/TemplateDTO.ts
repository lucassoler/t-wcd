import FieldDTO from "./FieldDTO";
import SectionDTO from "./SectionDTO";

export default interface TemplateDTO {
    id: string,
    name: string,
    fields: FieldDTO[],
    sections: SectionDTO[]
}