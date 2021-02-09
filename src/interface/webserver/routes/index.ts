import express from 'express';
import { Dependencies } from '../../../infrastructure/config/dependencies';
import field from './field';
import section from './section';
import template from './template';

export default ((dependencies:Dependencies) => {
    const routes = express.Router();

    routes.use('/template', template(dependencies));

    routes.use('/section', section(dependencies));
    routes.use('/field', field(dependencies));

    return routes;
});