import TemplateRepository from "../../domain/repositories/TemplateRepository";
import { Dependencies } from "./dependencies";
import { TemplateDI } from "./DI/TemplateDI";

export default (() => {
    const templateRepository:TemplateRepository = TemplateDI.templateRepository;

    const beans:Dependencies = {
        templateRepository: templateRepository
    };
    
    return beans;
})();