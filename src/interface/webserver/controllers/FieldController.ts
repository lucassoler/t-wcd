import { Dependencies } from "../../../infrastructure/config/dependencies";
import { Request, Response } from "express";
import FieldCreating from "../../../application/usecases/FieldCreating";
import TemplateDTO from "../../presenters/TemplateDTO";
import { TemplatePresenter } from "../../presenters/TemplatePresenter";

export default class FieldController {
    dependencies:Dependencies;

    constructor(dependencies:Dependencies) {
        this.dependencies = dependencies;
    }


    async create(req:Request, res:Response) {
        console.log(req.params)
        const fieldCreating:FieldCreating = new FieldCreating(this.dependencies.templateRepository);
        const result = await fieldCreating.Execute(req.params.templateId, req.body.name, req.body.type, req.body.required, req.body.parentId);

        if (result.error) {
            if (result.error.message === 'template not founded') {
                return res.status(404).json({ error: result.error.message });
            }

            return res.status(400).json({ error: result.error.message });
        }

        const templatePresented:TemplateDTO = TemplatePresenter.present(result.succeed);

        return res.status(200).json({ section: templatePresented });
    }

}