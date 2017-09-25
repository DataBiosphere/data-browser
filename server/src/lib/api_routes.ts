/**
 * API ROUTES
 */

/**
 * Types
 */
import { Application } from "express";

/**
 * Web Controllers
 */
import * as sessionWebController from "./auth/session-webcontroller";
import * as personWebController from "./person/person-webcontroller";

export default (app: Application) => {

    // Session
    app.get("/api/session", sessionWebController.getSession);
    app.get("/api/user/redwood-token", personWebController.getRedwoodToken);

    // All undefined routes should go to 404
    app.all("/api/*", (req, res) => {
        res.sendStatus(404);
    });
};