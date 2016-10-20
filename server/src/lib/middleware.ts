/**
 * MIDDLEWARE
 */
import { Response as Res, RequestHandler } from "express";

import { ResponseError } from "cc-express-utils";
import * as path from "path";
import * as _ from "lodash";
import { Req, ErrorCallback } from "../boardwalk";

/**
 * Protect routes on your api from unauthenticated access
 *
 * @param req {string}
 * @param res {string}
 * @param next {Function}
 */
export function auth(req: Req, res: Res, next: ErrorCallback): void {

    if (req.isAuthenticated()) {
        return next(null);
    }
    else {
        let error: ResponseError = new ResponseError("User not authenticated", 401);
        error.statusCode = 401;
        next(error);
    }
}

/**
 * Require Role
 *
 * @param role
 * @param args
 * @returns {function(Req, Res, ErrorCallback): void}
 */
export function requireRole(role: string, ...args: string[]): RequestHandler {

    let rolesArr: string[];

    // Handle the case where more than one role is specified
    if (args.length === 0) {
        rolesArr = [role];
    }
    else {
        rolesArr = _.toArray(arguments);
    }

    return function(req: Req, res: Res, next: ErrorCallback) {

        let error: ResponseError;

        if (!req.isAuthenticated()) {

            // User has not been authenticated - return 401
            error = new ResponseError("User not authenticated", 401);
            next(error);
        }
        else if (rolesArr.indexOf(req.user.role) > -1) {

            // User has the expected role - nothing to see here!
            return next(null);
        }
        else {

            // User is not authorized - return 403
            error = new ResponseError("User not authorized", 403);
            next(error);
        }
    };
}

/**
 * Convert array of filter/sort order string values to arrays of JSON objects
 *
 * @param req {string}
 * @param res {string}
 * @param next {Function}
 */
export function parseQueryString(req: Req, res: Res, next: ErrorCallback): void {

    let filters: string = req.query.filters;
    if (filters && filters.length) {

        req.query.filters = parseArrayAsJSON(filters);
    }

    let sorts: string = req.query.sorts;
    if (sorts && sorts.length) {

        req.query.sorts = parseArrayAsJSON(sorts);
    }

    let populates: string = req.query.populates;
    if (populates && populates.length) {

        req.query.populates = parseArrayAsJSON(populates);
    }

    next(null);
}

/**
 * @param req {string}
 * @param res {string}
 * @param partialPath {string}
 */
export function angularPartials(req: Req, res: Res, partialPath: string) {

    const stripped = req.url.split(".")[0];
    const requestedView = path.join(partialPath, stripped) + ".html";

    res.sendFile(requestedView, (err) => {
        if (err) {
            console.log("Error rendering partial \"" + requestedView + "\"\n", err);
            res.sendStatus(404);
        }
        else {
            res.end();
        }
    });
}

/**
 * PRIVATES
 */

/**
 * Convert array of strings to array of JSON objects
 *
 * @param array {string[]}
 * @returns {Object[]}
 */
function parseArrayAsJSON(array: string|string[]): Object[] {

    let arr: string[];

    if (!Array.isArray(array)) {
        arr = [].concat(array);
    }

    return arr.map((item) => {
        return JSON.parse(item);
    });
}
