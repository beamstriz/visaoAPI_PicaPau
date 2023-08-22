import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Options } from '../config/swagger';
import {routerGetInformationsForPicaPau } from './GetInformationsForSamirroutes.routes';
import { routerInsertSapiens } from './InsertSapiensForSamir.routes';


export const routes = express();

routes.use("/samir", routerInsertSapiens);
routes.use("/samir", routerGetInformationsForPicaPau);



/**
 * Swagger Roter
 */
const swaggerSpec = swaggerJSDoc(Options);
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * Error tratament
 */
routes.use((req, res, next) => {
    const error = new Error("I`m Batman!!");
    next(error)
})
routes.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})
