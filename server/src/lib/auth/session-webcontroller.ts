/**
 * Session Web Controller
 */
/**
 * Types
 */
import { Response as Res } from "express";
import { Req } from "../../boardwalk";

/**
 * Dependencies
 */
import * as personService from "../person/person-service";
import { setupResponseCallback } from "cc-express-utils";

/**
 * Get Session With Bearer
 *
 * @param {Req} req
 * @param {"~express/lib/express".createApplication.Response} res
 */
// export function getSession(req: Req, res: Res) {
//
//     const sessionCookie = req.cookies["session"];
//     if (!sessionCookie) {
//         return res.status(200).json({});
//     }
//
//     personService.getUserFromSessionCookie(sessionCookie, setupResponseCallback(res));
// }