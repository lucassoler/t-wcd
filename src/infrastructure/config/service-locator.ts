import TemplateRepository from "../../domain/repositories/TemplateRepository";
import TemplateRepositoryInMemory from "../repositories/TemplateRepositoryInMemory";
import { Dependencies } from "./dependencies";

export default (() => {
    const templateRepository:TemplateRepository = new TemplateRepositoryInMemory([]);

    const beans:Dependencies = {
        templateRepository: templateRepository
    };
    
    return beans;
})();