import express, { Request, Response } from "express";
import { Dependencies } from "../../../infrastructure/config/dependencies";
import TemplateController from "../controllers/TemplateController";

export default ((dependencies:Dependencies) => {
    const templateRouter = express.Router();

    templateRouter.route('/')
        .get((req:Request, res:Response) => {
            new TemplateController(dependencies).all(req, res);
        })
        .post((req:Request, res:Response) => {
            new TemplateController(dependencies).create(req, res);
        });

    templateRouter.route('/:templateId')
        .get((req:Request, res:Response) => {
            new TemplateController(dependencies).get(req, res);
        });

    return templateRouter;
});