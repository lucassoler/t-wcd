import Section from "../../domain/entities/Section";
import SectionDTO from "./SectionDTO";

export class SectionPresenter {
    static present(section:Section): SectionDTO {
        return {
            id: section.id,
            name: section.name,
            parentId: section.parentId
        };
    }
}