/**
 * Person service
 */
"use strict";

/**
 * Interfaces
 */
import { Response as Res } from "express";
import { Callback, OID, ListModelCB, ErrorCallback } from "../../boardwalk";
import { Person, PersonPartial } from "./person-definition";
import { Auth } from "../auth/auth-definition";

/**
 * Dependencies
 */
import { QueryModel } from "cc-qm";
import * as async from "async";
import * as _ from "lodash";
import * as shortid from "shortid";
import { ResponseError } from "cc-express-utils";

/**
 * Services
 */
import * as authService from "../auth/auth-service";
// import * as emailService from "../email/email-service";

/**
 * DAOs
 */
import * as personDAO from "./person-dao";

/**
 * Constants
 */
import { EDITABLE_FIELDS, STATUS } from "./person";

/**
 * Find person with the specified activation key and update to indicate email has been confirmed (if not previously
 * confirmed).
 *
 * @param token {string}
 * @param next {function}
 */
export function confirmEmail(token: string, next: Callback<Person>): void {

    const qm = new QueryModel();
    qm.addEqualsQueryFilter("activationKey", token);

    findPerson(qm, (error, person) => {

        if (error) {
            return next(error);
        }

        if (!person) {
            return next(new ResponseError("Unprocessable Entity", 422));
        }

        if (person.emailConfirmed) {
            return next(null, person);
        }

        async.auto({

            // Mark token as used
            updateAccessToken: (callback) => {

                authService.markTokenAsUsed(token, callback);
            },

            // Update person to indicate email has been confirmed
            updatePerson: ["updateAccessToken", (callback) => {

                person.emailConfirmed = true;
                savePerson(person, callback);
            }]

        }, (error) => {

            if (error) {
                return next(error);
            }
            next(null, person);
        });
    });
}

/**
 * Create Person
 *
 * @param user
 * @param person
 * @param next
 */
export function createPerson(user: Person, person: PersonPartial, next: Callback<Person>): void {

    if (user.role !== "ADMIN") {
        return next(new ResponseError("Invalid permissions", 403));
    }

    person.createdAt = new Date();
    person.createdBy = user._id;
    person.role = "USER";
    person.activationKey = shortid.generate();

    personDAO.createPerson(person, next);
}

/**
 * Return status of activation key - either VALID or INVALID
 *
 * @param activationKey
 * @param next {Callback<string>}
 */
export function getActivationKeyStatus(activationKey: string, next: Callback<string>): void {

    const qm = new QueryModel();
    qm.addEqualsQueryFilter("activationKey", activationKey);

    findPerson(qm, (error, person) => {

        if (error) {
            return next(error);
        }

        // Activation key is invalid there is no person with this activation key or if the activation key
        // has already been used
        if (!person || person.emailConfirmed) {
            return next(null, "INVALID");
        }

        next(null, "VALID");
    });
}

/**
 * Invite User
 *
 * @param user
 * @param personId
 * @param res
 * @param next
 */
export function sendUserInvite(user: Person, personId: OID, res: Res, next: Callback<Person>): void {

    findPersonById(personId, (error, person) => {

        if (error) {
            return next(error);
        }

        // Update invited flag on user
        person.invited = true;
        personDAO.savePerson(person, (updateError, savedPerson) => {

            if (updateError) {
                return next(updateError);
            }

            // emailService.sendActivateAccountEmail({
            //     res: res,
            // }, savedPerson);

            next(null, savedPerson);
        });
    });
}

/**
 * Save Person
 *
 * @param person
 * @param next
 */
export function savePerson(person: Person, next: Callback<Person>): void {

    personDAO.savePerson(person, next);
}

/**
 * Count All People
 * @param qm
 * @param next
 */
export function countAllPeople(qm: QueryModel, next: Callback<number>): void {

    qm.setAsCountFunction();
    personDAO.findAllPeople(qm, next);
}

/**
 * Find people with the specified filter and sort order
 *
 * @param user
 * @param qm QueryModel
 * @param next Callback<Person>
 */
export function findAllPeople(user: Person, qm: QueryModel, next: ListModelCB<Person>): void {

    async.parallel({

        people: (callback) => {
            personDAO.findAllPeople(qm, callback);
        },

        peopleCount: (callback) => {

            if (qm.isPaginated()) {

                const countQm = new QueryModel();
                countQm.initFrom(qm);
                countAllPeople(countQm, callback);
            }
            else {
                callback();
            }
        }
    }, (error, results) => {

        if (error) {
            return next(error);
        }

        const items = results["people"] as Array<Person>;
        const count = results["peopleCount"] as number;

        next(null, {
            items: items,
            count: count
        });
    });
}

/**
 * Find All People By ClientId
 *
 * @param user
 * @param clientId
 * @param next
 */
export function findAllPeopleByClientId(user: Person, clientId: OID, next: ListModelCB<Person>): void {

    const qm = new QueryModel();
    qm.addEqualsQueryFilter("client", clientId);
    findAllPeople(user, qm, next);
}

/**
 * Find person with specified ID
 *
 * @param personId ID of user to query for
 * @param next Callback<Person>
 */
export function findPersonById(personId: OID, next: Callback<Person>): void {

    const qm = new QueryModel();
    qm.addEqualsQueryFilter("_id", personId);
    findPerson(qm, next);
}

/**
 * Find for edit
 *
 * @param personId
 * @param next
 */
export function findPersonForEdit(personId: OID, next: Callback<PersonPartial>): void {

    findPersonById(personId, (error, person) => {

        if (error) {
            return next(error);
        }

        const editablePerson: PersonPartial = _.pick(person.toObject(), [EDITABLE_FIELDS]);
        next(null, editablePerson);
    });
}

/**
 * Find person matching specified filter
 *
 * @param qm
 * @param next
 */
export function findPerson(qm: QueryModel, next: Callback<Person>): void {

    personDAO.findPerson(qm, next);
}

/**
 * User has request reset of password - generate reset link
 * and send email
 *
 * @param email
 * @param res
 * @param next
 */
export function requestResetPassword(email: string, res: Res, next: Callback<Person>): void {

    const qm = new QueryModel();
    qm.addEqualsQueryFilter("email", email);

    personDAO.findPerson(qm, (error, person) => {

        if (error) {
            return next(error);
        }

        // Confirm matching person was found
        if (!person) {
            // Send vague error message on porpoise so we don't leek info
            return next(new ResponseError("Unable to reset password.", 422));
        }

        // Check if person has activated account
        if (!person.active) {
            return next(new ResponseError("Unable to reset password.", 422));
        }

        // Check if person was not suspended
        if (person.status === STATUS.SUSPENDED) {
            return next(new ResponseError("Unable to reset password.", 422));
        }

        // Generate new forgot key
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (14 * 24 * 60 * 60 * 1000));
        const forgotKey = (Math.random() + 1).toString(36).substring(7);

        person.forgotKeyExpiryDate = expiryDate;
        person.forgotKey = forgotKey;

        personDAO.savePerson(person, (error, savedPerson) => {

            if (error) {
                return next(error);
            }

            // Send reset password email
            // emailService.sendResetPasswordEmail({
            //     res: res
            // }, savedPerson);

            next(null, savedPerson);
        });
    });
}

/**
 * Resend confirm account email
 *
 * @param personId
 * @param res
 * @param next
 */
export function resendConfirmAccountEmail(personId: OID, res: Res, next: ErrorCallback): void {

    findPersonById(personId, (error, person) => {

        if (error) {
            return next(error);
        }

        if (!person) {

            return next(new ResponseError("Unprocessable Entity", 422));
        }

        // Don't resend confirmation email if user has already confirmed
        if (person.emailConfirmed) {
            return next(null);
        }

        // // Send confirm account email
        // emailService.resendConfirmAccountEmail({
        //     res: res
        // }, person);

        next(null);
    });
}

/**
 * Set user password - called during account activation flow
 *
 * @param activationKey {string}
 * @param password {string}
 * @param next {Callback<any>}
 */
export function setPersonPassword(activationKey: string, password: string, next: Callback<any>) { // TODO revisit type here

    async.auto({

        // Find the person for this activation key
        person: (callback) => {

            const qm = new QueryModel();
            qm.addEqualsQueryFilter("activationKey", activationKey);

            findPerson(qm, callback);
        },

        // Confirm person is found for the activation key and activation key is still valid
        validation: ["person", (results, callback) => {

            const person = results.person;
            if (!person || person.emailConfirmed) {

                return callback(new ResponseError("Invalid permissions", 403));
            }

            callback();
        }],

        // Activation key is valid - create password
        auth: ["person", "validation", (results, callback) => {

            const person = results.person;
            authService.createPassword(person._id, password, callback);
        }],

        // Update user as email confirmed TODO should we rename emailConfirmed?
        activatedUser: ["person", "validation", "auth", (results, callback) => {

            const personUpdates = {
                emailConfirmed: true
            };
            updatePerson(results.person._id, personUpdates, callback);
        }]

    }, (error, results) => {

        if (error) {
            return next(error);
        }

        next(null, results.activatedUser);
    });
}

/**
 * Update Person
 *
 * @param personId
 * @param updates
 * @param next
 */
export function updatePerson(personId: OID, updates: PersonPartial, next: Callback<Person>): void {

    const qm = new QueryModel();
    qm.addEqualsQueryFilter("_id", personId);
    personDAO.updatePerson(qm, updates, next);
}

/**
 * Update Password
 *
 * @param personId
 * @param password
 * @param next
 */
export function updatePersonPassword(personId: OID, password: string, next: Callback<Person>): void {

    async.auto({
        auth: (callback) => {

            authService.updatePassword(personId, password, callback);
        },

        person: ["auth", (results, callback) => {

            const auth = results.auth as Auth;
            findPersonById(auth.person, callback);
        }]

    }, (error, results) => {

        if (error) {
            return next(error);
        }
        next(null, results.person);
    });
}
