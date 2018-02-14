/**
 * Person service
 */


"use strict";

/**
 * Interfaces
 */
import { Callback } from "../../boardwalk";
import { RequestResponse } from "request";

/**
 * Dependencies
 */
import * as request from "request";

/**
 * Services
 */
import { Person } from "./person";
import { config } from "../config/config";

/**
 * Constants
 */
const BEARER_TOKEN = process.env["BEARER_TOKEN"] || "ITS_A_SECRET!";

/**
 * Get User From Session Cookie
 *
 * @param {string} cookie
 * @param {Callback<Person>} next
 */
export function getUserFromSessionCookie(cookie: string, next: Callback<Person>) {

    const sessionUrl = `${process.env.BW_DATA_URL}/check_session/${cookie}`;

    request
        .get(sessionUrl, {
            auth: {
                bearer: BEARER_TOKEN
            }
        }, (error: Error, response: RequestResponse, body: any) => {

            if (error) {
                return next(error);
            }

            let user;
            try {
                user = JSON.parse(body);
            }
            catch (e) {
                return next(e);
            }
            console.log(user);

            if (user.error) {
                return next(new Error(user.error));
            }
            next(null, user);
        });
}
