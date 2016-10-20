/**
 * Auth DAO
 */
import { Callback } from "../../boardwalk";
import { Auth, AuthPartial } from "./auth-definition";
import { AccessTokenPartial, AccessToken } from "./accesstoken-definition";

import { QueryModel, queryBuilder } from "cc-qm";

import { AuthModel } from "./auth";
import { AccessTokenModel } from "./accesstoken";

/**
 * Create Auth Object
 *
 * @param auth
 * @param next
 */
export function createAuth(auth: AuthPartial, next: Callback<Auth>): void {

    AuthModel.create(auth, next);
}

/**
 * Find Auth Object
 *
 * @param qm
 * @param next
 */
export function findAuth(qm: QueryModel, next: Callback<Auth>): void {

    let query = AuthModel.findOne({});
    queryBuilder.buildQuery(query, qm);
    query.exec(next);
}

/**
 * Update Auth
 *
 * @param qm
 * @param updates
 * @param next
 */
export function updateAuth(qm: QueryModel, updates: AuthPartial, next: Callback<Auth>): void {

    let query = AuthModel.findOne({});
    queryBuilder.buildQuery(query, qm);
    updates.updatedAt = new Date();

    query.findOneAndUpdate({},
        updates,
        { new: true },
        next
    );
}

/**
 * Create Access Token
 *
 * @param token
 * @param next
 */
export function createAccessToken(token: AccessTokenPartial, next: Callback<AccessToken>): void {

    AccessTokenModel.create(token, next);
}

/**
 * Find Access Token
 *
 * @param qm
 * @param next
 */
export function findAccessToken(qm: QueryModel, next: Callback<AccessToken>): void {

    let query = AccessTokenModel.findOne({});
    queryBuilder.buildQuery(query, qm);
    query.exec(next);
}

/**
 * Update Access Token
 *
 * @param qm
 * @param updates
 * @param next
 */
export function updateAccessToken(qm: QueryModel, updates: AccessTokenPartial, next: Callback<AccessToken>): void {

    let query = AccessTokenModel.findOne({});
    queryBuilder.buildQuery(query, qm);

    query.findOneAndUpdate({},
        updates,
        { new: true },
        next
    );
}