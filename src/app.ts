import express from "express";
import cors from "cors";
import logger from "morgan";
import { routes } from "./routes";

const expr = express();

expr.use(express.json({limit: '50mb'}));
expr.use(express.urlencoded({limit: '50mb'}));
// app.use(express.json());

/**
 * open access to services
 */
expr.use(cors());

/**
 * Permission to receive and send json
 */

/**
 * Configuration of logs
 */
expr.use(logger("dev"));

/**
 * The routes of API
 */
expr.use(routes);


/**
 * Connection in DB
 */




export { expr } 