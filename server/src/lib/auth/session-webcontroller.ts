/**
 * Session Web Controller
 */
/**
 * Types
 */
import { Response as Res, NextFunction as Next, RequestHandler } from "express";
import { Req } from "../../boardwalk";
import { Person } from "../person/person-definition";

/**
 * Dependencies
 */
import * as passport from "passport";
import * as activityLogService from "../activity-log/activitylog-service";
import { ResponseError, setupResponseCallback } from "cc-express-utils";
import * as request from "request";
import { RequestResponse } from "request";
import { config } from "../config/config";

const BEARER_TOKEN = process.env["BEARER_TOKEN"] || "ITS_A_SECRET!";

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
export function login(req: Req, res: Res, next: Next): void {

    const handler = passport.authenticate("local", (error: ResponseError, user: Person) => {

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
    }) as RequestHandler;
    handler(req, res, next);
}

/**
 * Get Session Iteration1
 *
 * @param {Req} req
 * @param {"~express/lib/express".createApplication.Response} res
 * @returns {"~express/lib/express".createApplication.Response}
 */
// export function getSession2(req: Req, res: Res) {
//
//     /*
//         {
//             "avatar": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
//             "email": "chris@clevercanary.com",
//             "name": "Chris Bajorin",
//             "redwood_token": "None"
//         }
//      */
//
//     const sessionCookie = req.cookies["session"] || ".eJwNzsFqg0AQANBfKXvuQTf10EAPtlqxMCOR0TBzCZpKdzdZSlExbsi_1_s7vLs62W-1v6unXu0VFI1GX2ogvlVF7ZjKlYPxoCEWl66oIUFde_SsMeOoylqHQS5IrQHKIyxqu7mdeF4kezfs8xjDQXNoDdI5SNGscIREsvRF6HBjd07QyRWyPBLXWqFPK742HH7W6gihKsqEKY3FNwvT1wX99qDWcUjf1ONZ_XbzZE7j1E3DtrfT2MeNHvoPmhdn_8po3g3wep0G6btRPf4BZ0FOgw.DKQwNg.YjOD6wWrqTiTxbo2LqGzxS5LDzE"; // ".eJwdz81ugkAUQOFXae6aBUxLmpJ0gQEJ1rkoDNg7G6KWdhidNuGnyhjfvaT7s_jODerPrukVBEM3Ng7U7QcEN3g4QAA8KRmalHFB1yzJNYl0IqsMZ9yTOpyQcR9ZbtAQw4jcLKo0WnlCUSkuYheTvJ27R2noIqOFIhN7aLeMbKVQHK1MyonvuC-j8EmK7ZX00UctzzyKXamrVoplK02uyH5N2Y7bLEl9EqEnTXkhsTqhmR2i0mTDV7g78LMfB1X3w35oZj0Wm7dn9r1ZJeYXw7IYipdoPSwX7fthPZ7BgbFvuv9dYHD_A5jwVoA.DKQjkQ.CSz0c8jgZksG-odZHmffQvEoK4c";
//     const sessionUrl = `${config.ucsc_url}/check_session/${sessionCookie}/${BEARER_TOKEN}`;
//
//     if (!sessionCookie || !sessionCookie.length) {
//         return res.status(200).json({});
//     }
//
//     request
//         .get(sessionUrl, /*{
//             auth: {
//                 "bearer": bearerToken
//             }
//         },*/ (error: Error, response: RequestResponse, body: any) => {
//
//             if (error) {
//                 return setupResponseCallback(res)(error);
//             }
//
//             if (!body) {
//                 return res.status(200).json({});
//             }
//
//             let user;
//             try {
//                 user = JSON.parse(body);
//             }
//             catch (e) {
//                 return res.status(500).json({});
//             }
//             console.log(user);
//
//             if (user.error) {
//                 // { error: 'Cookie not valid; does not have necessary fields' }
//                 return res.status(200).json({});
//             }
//
//             res.status(200).json(user);
//         });
// }

/**
 * Get Session With Bearer
 *
 * @param {Req} req
 * @param {"~express/lib/express".createApplication.Response} res
 */
export function getSession(req: Req, res: Res): void {

    const sessionCookie = req.cookies["session"] || ".eJwdz8FugkAQgOFXaebsAbaSpiQ90C5Qa3aIZEVnLsRa2mXtxlRAZY3vrun9P3z_BervQ9MZiPvD0Eygbr8gvsDDJ8Sg8qVANxNK07nIS0t6NpI3TgkVsk1GFCpCUTp0JFBSUMjKoucd6soonQaYl-29e2RHJ5avhlwaol8I8pVBvfWcL0e1UhHLZMp6cSa7jdDyr5JpwLZqWWctu9KQ_xmLlfJFPotIJyG75Yn0xw7d3aErSz55gesE9puhN3XXb_rmrpdHs_7DLMjMmt91IOf7tHx7ej5OT0k2VzCBoWsO_7sg4HoDksZV-Q.DKRF9A.T_11yDaQOyur4Mf1cj-mCEIYECQ";
    const sessionUrl = `${config.ucsc_url}/check_session/${sessionCookie}`;

    request
        .get(sessionUrl, {
            auth: {
                bearer: BEARER_TOKEN
            }
        }, (error: Error, response: RequestResponse, body: any) => {

            if (error) {
                return setupResponseCallback(res)(error);
            }

            if (!body) {
                return res.status(200).json({});
            }

            let user;
            try {
                user = JSON.parse(body);
            }
            catch (e) {
                return res.status(500).json({});
            }
            console.log(user);

            if (user.error) {
                // { error: 'Cookie not valid; does not have necessary fields' }
                return res.status(200).json({});
            }

            res.status(200).json(user);
        });
}