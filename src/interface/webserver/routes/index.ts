import express from 'express';
import { Dependencies } from '../../../infrastructure/config/dependencies';
import template from './template';

export default ((dependencies:Dependencies) => {
    const routes = express.Router();

    routes.use('/template', template(dependencies));

    return routes;
});