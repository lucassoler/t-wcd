import { Dependencies } from "../../../infrastructure/config/dependencies";
import { Request, Response } from "express";
import TemplateListing from "../../../application/usecases/TemplateListing";
import TemplateDTO from "../../presenters/TemplateDTO";
import { TemplateListPresenter } from "../../presenters/TemplateListPresenter";
import TemplateGet from "../../../application/usecases/TemplateGet";
import { TemplatePresenter } from "../../presenters/TemplatePresenter";
import TemplateCreating from "../../../application/usecases/TemplateCreating";
import TemplateListDTO from "../../presenters/TemplateListDTO";
import TemplateUpdating from "../../../application/usecases/TemplateUpdating";

export default class TemplateController {
    dependencies:Dependencies;

    constructor(dependencies:Dependencies) {
        this.dependencies = dependencies;
    }


    async all(req:Request, res:Response) {
        const templateListing:TemplateListing = new TemplateListing(this.dependencies.templateRepository);
        const result = await templateListing.Execute();

        const templatesPresented:TemplateListDTO[] = [];
        
        for (let i = 0; i < result.succeed.length; i++) {
            templatesPresented.push(TemplateListPresenter.present(result.succeed[i]));
        }

        return res.status(200).json({ templates: templatesPresented });
    }


    async get(req:Request, res:Response) {
        const templateGet:TemplateGet = new TemplateGet(this.dependencies.templateRepository);
        const result = await templateGet.Execute(req.params.templateId);

        if (result.error) {
            return res.status(404).json({ error: result.error.message });
        }

        const templatePresented:TemplateDTO = TemplatePresenter.present(result.succeed);

        return res.status(200).json({ template: templatePresented });
    }


    async create(req:Request, res:Response) {
        const templateCreating:TemplateCreating = new TemplateCreating(this.dependencies.templateRepository);
        const result = await templateCreating.Execute(req.body.name);

        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }

        const templatePresented:TemplateDTO = TemplatePresenter.present(result.succeed);

        return res.status(200).json({ template: templatePresented });
    }
    
    async update(req:Request, res:Response) {
        const templateUpdating:TemplateUpdating = new TemplateUpdating(this.dependencies.templateRepository);
        const result = await templateUpdating.Execute(req.params.templateId, req.body.name);

        if (result.error) {
            if (result.error.message === 'template not founded') {
                return res.status(404).json({ error: result.error.message });
            }

            return res.status(400).json({ error: result.error.message });
        }

        const templatePresented:TemplateDTO = TemplatePresenter.present(result.succeed);

        return res.status(200).json({ template: templatePresented });
    }
}