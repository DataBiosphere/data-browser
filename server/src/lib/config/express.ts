/**
 * Express setup
 */
import { Response as Res, NextFunction as Next, Application } from "express";
import { Req } from "../../boardwalk";
import * as path from "path";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
let expressValidator = require("express-validator");
import * as methodOverride from "method-override";

import * as logger from "morgan";

// import * as favicon from "serve-favicon";
import * as serveStatic from "serve-static";
let UAParser = require("ua-parser-js");

import * as exphbs from "express-handlebars";

import { handleSafariCaching, ResponseError } from "cc-express-utils";
import apiRoutes from "../api_routes";
import appRoutes from "../app_routes";

import { config } from "./config";



let parser = new UAParser();

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



    /**
     * STAGE/PROD
     */
    // if (app.get("env") === "stage" || app.get("env") === "production") {

    // // Force HTTPS
    // app.use((req: Req, res: Res, next: Next) => {
    //     if ((!req.secure) && (req.get("X-Forwarded-Proto") !== "https")) {
    //
    //         res.redirect("https://" + req.get("Host") + req.url);
    //     }
    //     else {
    //         next();
    //     }
    // });

    // app.use(favicon(path.join(config.root, "dist", "favicon.ico")));

    // }

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


    // Set up view engine
    app.set("view engine", "handlebars");

    app.use((req: Req, res: Res, next: Next) => {

        const ua = parser.setUA(req.headers["user-agent"] as string).getResult();

        // Show unsupported page for <= IE10
        const browserName = ua.browser.name;
        const browserVersion = ua.browser.version;

        if (browserName === "IE" &&
            (browserVersion.indexOf("10") >= 0 ||
            browserVersion.indexOf("9") >= 0 ||
            browserVersion.indexOf("8") >= 0 ||
            browserVersion.indexOf("7") >= 0 ||
            browserVersion.indexOf("6") >= 0)
        ) {
            res.sendFile(path.join(config.root, "dist/static/browser-not-supported.html"));
        }

        next();
    });

    // API Routing
    apiRoutes(app);

    // App routes
    appRoutes(app);

    // Router (only error handlers should come after this)
    // app.use(app.router);

    app.use(serveStatic(path.join(config.root, "dist")));
    // Allow Angular to handle paths...
    app.use((req: Req, res: Res) => {

        if (req.url.indexOf(".") > -1) {

            // Any assets (contains a ".") are not found
            res.sendStatus(404);
        }
        else {
            res.redirect("/boardwalk");
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
