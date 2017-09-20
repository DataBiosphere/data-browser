/**
 * Auth Service
 */
import { Auth, AuthPartial } from "./auth-definition";
import { AccessToken, AccessTokenPartial } from "./accesstoken-definition";

import * as crypto from "crypto";
import { QueryModel } from "cc-qm";

import * as authDAO from "./auth-dao";
import { OID, Callback } from "../../boardwalk";
import { Person } from "../person/person-definition";

/**
 * Create Auth Object
 *
 * @param personId
 * @param password
 * @param next
 */
export function createPassword(personId: OID, password: string, next: Callback<Auth>): void {

    let authObject: AuthPartial = {
        person: personId,
        salt: crypto.randomBytes(16).toString("base64")
    };
    authObject.hashedPassword = encryptPassword(password, authObject.salt);
    authDAO.createAuth(authObject, next);
}

/**
 * Update Person Password
 *
 * @param personId
 * @param password
 * @param next
 */
export function updatePassword(personId: OID, password: string, next: Callback<Auth>): void {

    let authUpdates: AuthPartial = {
        current: false
    };
    let updateQm = new QueryModel();
    updateQm.addEqualsQueryFilter("person", personId);
    updateQm.addEqualsQueryFilter("current", true);
    authDAO.updateAuth(updateQm, authUpdates, (error) => {

        if (error) {
            return next(error);
        }
        createPassword(personId, password, next);
    });
}


/**
 * Authenticate Password
 *
 * @param personId
 * @param password
 * @param next
 */
export function authenticate(personId: OID, password: string, next: Callback<boolean>): void {

    let qm = new QueryModel();
    qm.addEqualsQueryFilter("person", personId);
    qm.addEqualsQueryFilter("current", true);
    authDAO.findAuth(qm, (error, authObject) => {

        if (error) {
            return next(error);
        }

        if (!authObject) {
            return next(new Error("No current password"));
        }

        let isValid = (encryptPassword(password, authObject.salt) === authObject.hashedPassword);
        return next(null, isValid);
    });
}

/**
 * Create new auth token
 *
 * @param userId
 * @param expirationDate
 * @param next
 */
export function createAccessToken(userId: OID, expirationDate: Date, next: Callback<AccessToken>): void {

    let accessToken: AccessTokenPartial = {
        user: userId,
        token: generateToken(),
        expirationDate: expirationDate,
        used: false
    };
    authDAO.createAccessToken(accessToken, next);
}

/**
 * Find auth token by token
 *
 * @param token
 * @param next
 */
export function findAccessTokenByToken(token: string, next: Callback<AccessToken>): void {

    let qm = new QueryModel();
    qm.addEqualsQueryFilter("token", token);
    authDAO.findAccessToken(qm, next);
}

/**
 * Mark Token As Used
 * @param token
 * @param next
 */
export function markTokenAsUsed(token: string, next: Callback<AccessToken>): void {

    let updates: AccessTokenPartial = {
        used: true,
        usedDate: new Date()
    };
    let qm = new QueryModel();
    qm.addEqualsQueryFilter("token", token);
    authDAO.updateAccessToken(qm, updates, next);
}

/**
 * Check User Role
 *
 * @param user
 * @returns {boolean}
 */
export function isUserRole(user: Person): boolean {
    return user.role === "USER";
}

/**
 * PRIVATES
 */

/**
 * Encrypt Password
 *
 * @param password
 * @param salt
 * @returns {string}
 */
function encryptPassword(password: string, salt: string): string {

    let saltBuffer = new Buffer(salt, "base64");
    return crypto.pbkdf2Sync(password, saltBuffer, 10000, 64, "sha256").toString("base64");
}

/**
 * Generate Token
 */
function generateToken(): string {

    return crypto.createHash("sha224")
        .update(crypto.randomBytes(24))
        .digest("hex").slice(0, 10);
}