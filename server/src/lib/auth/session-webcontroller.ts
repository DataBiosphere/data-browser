/**
 * Session Web Controller
 */
/**
 * Types
 */
import { Response as Res } from "express";
import { ErrorCallback, Req } from "../../boardwalk";
import { Person } from "../person/person-definition";

/**
 * Dependencies
 */
import * as passport from "passport";
import * as activityLogService from "../activity-log/activitylog-service";
import { ResponseError } from "cc-express-utils";


/**
 * Logout
 */
export function logout(req: Req, res: Res): void {

    let activity = activityLogService.buildActivityEvent("LOGOUT");
    activityLogService.createActivityLog(req.user, req.ip, activity, () => {

        req.logout();
        // TODO verify all the magic is actually required.
        req.session.destroy((error) => {

            if (error) {
                res.status(500).json(error);
            }
            res.clearCookie("connect.sid");
            res.sendStatus(204); // TODO revisit - returning 204 for now (previously returning 200) - 200 causing error
                                 // in A2 base dao response.json() as 200 adds "OK" to response body which can't be
                                 // parsed
        });

    });
}

/**
 * Login
 */
export function login(req: Req, res: Res, next: ErrorCallback): void {

    passport.authenticate("local", (error: ResponseError, user: Person) => {

        if (error) {
            console.error(error);
            let statusCode = error.statusCode || 401;
            return res.status(statusCode).json(error);
        }

        req.logIn(user, (err) => {

            if (err) {
                return res.send(err);
            }

            const activity = activityLogService.buildActivityEvent("LOGIN");

            activityLogService.createActivityLog(req.user, req.ip, activity, () => {
                res.status(200).json(req.user);
            });
        });
    })(req, res, next);
}
