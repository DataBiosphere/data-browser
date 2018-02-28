/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * API end points.
 */

// Core dependencies
import { Application } from "express";

// App dependencies
import * as configWebController  from "./config/config-webcontroller";
import * as personWebController from "./person/person-webcontroller";
import * as sessionWebController from "./auth/session-webcontroller";

export default (app: Application) => {

    // Session
    app.get("/api/session", sessionWebController.getSession);
    app.get("/api/user/redwood-token", personWebController.getRedwoodToken);

    // Data end points
    app.get("/api/config", configWebController.getConfig);

    // All undefined routes should go to 404
    app.all("/api/*", (req, res) => {
        res.sendStatus(404);
    });
};
