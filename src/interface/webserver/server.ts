import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import serviceLocator from '../../infrastructure/config/service-locator';

const app = express();
const port = process.env.PORT || 8080;

// load middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// load routes
app.use('/api', routes(serviceLocator));

// eslint-disable-next-line arrow-body-style
const server = app.listen(port, () => console.log(`Server run on : http://localhost:${port}`));

export default server;