/**
 * Express setup
 */
import { Response as Res, NextFunction as Next, Application } from "express";
import { Req } from "../../boardwalk";
import * as path from "path";

import * as bodyParser from "body-parser";
let connect = require("connect-mongo");
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
let expressValidator = require("express-validator");
import * as methodOverride from "method-override";
let moment = require("moment-timezone");
import * as mongoose from "mongoose";
import * as logger from "morgan";
import * as passport from "passport";
// import * as favicon from "serve-favicon";
import * as serveStatic from "serve-static";
let UAParser = require("ua-parser-js");

import * as exphbs from "express-handlebars";

import { handleSafariCaching, ResponseError } from "cc-express-utils";
import apiRoutes from "../api_routes";
import appRoutes from "../app_routes";

import { config } from "../../lib/config/config";

import { PersonModel } from "../person/person";

let parser = new UAParser();
let mongoStore = connect(session);
const DEFAULT_TIMEZONE = "America/New_York";

/**
 * Express configuration
 */
export const expressConfig = (app: Application) => {
    /* jshint maxstatements: 60 */

    // handle safari refresh server crash
    app.use(handleSafariCaching);
    app.engine("handlebars", exphbs());

    if (app.get("env") !== "test") {
        // no api logging for test
        app.use(logger("dev"));
    }

    /**
     * LOCAL
     */
    if (app.get("env") === "local") {
        mongoose.set("debug", true);
    }


    /**
     * STAGE/PROD
     */
    if (app.get("env") === "stage" || app.get("env") === "production") {

        // Force HTTPS
        app.use((req: Req, res: Res, next: Next) => {
            if ((!req.secure) && (req.get("X-Forwarded-Proto") !== "https")) {

                res.redirect("https://" + req.get("Host") + req.url);
            }
            else {
                next();
            }
        });

        // app.use(favicon(path.join(config.root, "dist", "favicon.ico")));
        app.use(serveStatic(path.join(config.root, "dist")));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(expressValidator({
        customValidators: {
            isYesNo: function(val) {
                return val === "yes" || val === "no" || val === "";
            },
            notInvalid: function(val) {
                return val !== "Invalid";
            }
        }
    }));

    // Persist sessions with mongoStore
    app.use(session({
        secret: "love and rockets",
        store: new mongoStore({
            mongooseConnection: mongoose.connection,
            defaultExpirationTime: 15 * 60 * 1000
        }),
        resave: true,               // TODO these are the original express 3 default values, but all recommendations
                                    // are for "false"
        saveUninitialized: true     // TODO same as above
    }));

    // Use passport session
    app.use(passport.initialize());
    app.use(passport.session());


    // Add local variable indicating if user is authenticated
    // For use in Handlebars templates
    app.use((req: Req, res, next) => {

        res.locals.userAuthenticated = req.isAuthenticated();
        next();
    });

    // Set the user's last seen date
    app.use((req: Req, res: Res, next: Next) => {

        if (req.user && !req.query.wasNotMe) {

            let now = moment().tz(DEFAULT_TIMEZONE);
            PersonModel.update({ _id: req.user }, { $set: { lastSeen: now } }, next);
        }
        else {
            next();
        }
    });

    // Set up view engine
    app.set("view engine", "handlebars");

    // Detect and block access on IE8
    app.use((req: Req, res: Res, next: Next) => {

        const ua = parser.setUA(req.headers["user-agent"]).getResult();

        // Show unsupported page for < IE8
        const browserName = ua.browser.name;
        const browserVersion = ua.browser.version;
        if (browserName === "IE" &&
            (browserVersion.indexOf("9") >= 0 || browserVersion.indexOf("8") >= 0 || browserVersion.indexOf("7") >= 0 || browserVersion.indexOf("6") >= 0)) {
            return res.render("unsupported-browser", {
                layout: "static"
            });
        }

        next();
    });

    // API Routing
    apiRoutes(app);

    // App routes
    appRoutes(app);

    // Router (only error handlers should come after this)
    // app.use(app.router);

    // Allow Angular to handle paths...
    app.use((req: Req, res: Res) => {

        if (req.url.indexOf(".") > -1) {

            // Any assets (contains a ".") are not found
            res.sendStatus(404);
        }
        else {
            // Any paths go back to Angular and it can see if
            // it has a path.
            if (app.get("env") === "stage" || app.get("env") === "production") {
                res.sendFile(path.join(config.root, "dist/index.html"));
            }
            // local is served with angular-cli
        }
    });

    // Error handler
    app.use((err: ResponseError, req: Req, res: Res) => {

        console.error(err.stack);

        const errorStatus = err.statusCode || 500;

        // Handle XHR requests - return error STATUS.
        // Check if "Accept" header specifies application/json
        if (/application\/json/.test(req.get("accept"))) {
            return res.status(errorStatus).json(errorStatus);
        }
        // Handle regular requests - render error template
        else {
            return res.sendStatus(errorStatus);
        }
    });
};
