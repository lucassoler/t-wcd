import express, { Request, Response } from "express";
import { Dependencies } from "../../../infrastructure/config/dependencies";
import SectionController from "../controllers/SectionController";

export default ((dependencies:Dependencies) => {
    const sectionRouter = express.Router();

    sectionRouter.route('/:templateId')
        .post((req:Request, res:Response) => {
            new SectionController(dependencies).create(req, res);
        });

    return sectionRouter;
});