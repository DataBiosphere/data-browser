/**
 * API ROUTES
 */

/**
 * Types
 */
import { Application } from "express";

/**
 * Dependencies
 */
import { requireRole } from "./middleware";

/**
 * Validators
 */
import * as personValidator from "./person/person-validator";

/**
 * Web Controllers
 */
import * as sessionWebController from "./auth/session-webcontroller";
import * as personWebController from "./person/person-webcontroller";

export default (app: Application) => {

    // Person
    app.post("/api/people", personValidator.validateOnCreate, personWebController.createPerson);
    app.get("/api/people/me", personWebController.me);
    app.get("/api/people/:id", personWebController.findPersonById);
    app.put("/api/people/:id", requireRole("ADMIN"), personValidator.validateOnUpdate, personWebController.updatePerson);
    app.post("/api/people/:id/invite", personWebController.sendUserInvite);

    // Keys
    app.get("/api/activation-keys/:activationKey/status", personWebController.getActivationKeyStatus);

    // Password
    app.post("/api/people/password/request-reset", personWebController.requestResetPassword);
    app.post("/api/people/password/reset", personWebController.resetPassword);
    app.post("/api/people/password", personWebController.setPersonPassword);

    // Session
    app.post("/api/session", sessionWebController.login);
    app.delete("/api/session", sessionWebController.logout);

    // All undefined routes should go to 404
    app.all("/api/*", (req, res) => {
        res.sendStatus(404);
    });
};