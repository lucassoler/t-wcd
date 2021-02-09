import express, { Request, Response } from "express";
import { Dependencies } from "../../../infrastructure/config/dependencies";
import FieldController from "../controllers/FieldController";

export default ((dependencies:Dependencies) => {
    const fieldRouter = express.Router();

    fieldRouter.route('/:templateId')
        .post((req:Request, res:Response) => {
            new FieldController(dependencies).create(req, res);
        });

    return fieldRouter;
});