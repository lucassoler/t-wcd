import TemplateRepository from "../../../../domain/repositories/TemplateRepository";
import TemplateRepositoryInMemory from "../../../repositories/TemplateRepositoryInMemory";


export default class TemplateDIFactory {
    private static instance:TemplateDIFactory;
    private repository:TemplateRepository;

    constructor() {
        switch (process.env.MODE) {
            default:
                this.repository = this.loadContentInMemoryLoader()
        }
    }
    static templateRepository(): TemplateRepository {
        if (!this.instance) {
            this.instance = new TemplateDIFactory();
        }

        return this.instance.repository;
    }

    private loadContentInMemoryLoader(): TemplateRepository {
        return new TemplateRepositoryInMemory([]);
    }
}