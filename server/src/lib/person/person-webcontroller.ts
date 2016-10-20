/**
 * Web controller for person-related CRUD functionality
 */
/**
 * Types
 */
import { Response as Res } from "express";

/**
 * Dependencies
 */
import { setupResponseCallback, ResponseError } from "cc-express-utils";
import { QueryModel } from "cc-qm";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

/**
 * Services
 */
import * as activityLogService from "../activity-log/activitylog-service";
import * as personService from "./person-service";

/**
 * Models
 */
import { PersonModel } from "./person";
import { Req } from "../../boardwalk";
import { PersonPartial, Person } from "./person-definition";

/**
 * Create Person
 *
 * @param req
 * @param res
 */
export function createPerson(req: Req, res: Res): void {

    const person: PersonPartial = req.body;
    const user: Person = req.user;

    // Create person
    personService.createPerson(user, person, (error: ResponseError, person: Person) => {

        if (error) {
            return setupResponseCallback(res)(error);
        }

        // Log event and return person
        const activity = activityLogService.buildActivityEvent("PERSON_CREATE", person._id, "Person");
        activityLogService.createActivityLog(req.user, req.ip, activity, () => {
            setupResponseCallback(res)(null, person);
        });
    });
}

/**
 * Return status of activation key - either VALID or INVALID
 *
 * @param req {Req}
 * @param res {Res}
 */
export function getActivationKeyStatus(req: Req, res: Res): void {

    const activationKey: string = req.params.activationKey;
    personService.getActivationKeyStatus(activationKey, setupResponseCallback(res));
}

/**
 * Invite User
 *
 * @param req
 * @param res
 */
export function sendUserInvite(req: Req, res: Res): void {

    const user: Person = req.user;
    const personId = new ObjectId(req.params.id);

    // Send invite
    personService.sendUserInvite(user, personId, res, (error: ResponseError, person: Person) => {

        if (error) {
            return setupResponseCallback(res)(error);
        }

        // Log event and return person
        const activity = activityLogService.buildActivityEvent("USER_INVITE", person._id, "Person");
        activityLogService.createActivityLog(req.user, req.ip, activity, () => {
            setupResponseCallback(res)(null, person);
        });
    });
}

/**
 * Update person to indicate they have confirmed their email address.
 *
 * @param req {Object}
 * @param res {Object}
 */
export function confirmEmail(req: Req, res: Res): void {

    const token = req.query.token;
    personService.confirmEmail(token, setupResponseCallback(res));
}

/**
 * Find all people that match the specified filter
 * @param req
 * @param res
 */
export function findAllPeople(req: Req, res: Res): void {

    const qm = new QueryModel(req);
    const user: Person = req.user;
    personService.findAllPeople(user, qm, setupResponseCallback(res));
}

/**
 * Find All People By Client Id
 *
 * @param req
 * @param res
 */
export function findAllPeopleByClientId(req: Req, res: Res): void {

    const user: Person = req.user;
    const clientId = new ObjectId(req.params.id);
    personService.findAllPeopleByClientId(user, clientId, setupResponseCallback(res));
}

/**
 * Get person (profile) of specified user - profile is limited to just
 * core information (eg first name, last name, email etc)
 *
 * @param req
 * @param res
 */
export function findPersonById(req: Req, res: Res): void {

    const personId = new ObjectId(req.params.id);
    personService.findPersonById(personId, setupResponseCallback(res));
}

/**
 * Find for edit
 *
 * @param req
 * @param res
 */
export function findPersonForEdit(req: Req, res: Res): void {

    const personId = new ObjectId(req.user.id);
    personService.findPersonForEdit(personId, setupResponseCallback(res));
}

/**
 * Update Person
 *
 * @param req
 * @param res
 */
export function updatePerson(req: Req, res: Res): void {

    const updates: PersonPartial = req.body;
    const personId = new ObjectId(req.params.id);

    // Update person
    personService.updatePerson(personId, updates, (error: ResponseError, person: Person) => {

        if (error) {
            return setupResponseCallback(res)(error);
        }

        // Log event and return person
        const activity = activityLogService.buildActivityEvent("PERSON_UPDATE", person._id, "Person");
        activityLogService.createActivityLog(req.user, req.ip, activity, () => {
            setupResponseCallback(res)(null, person);
        });
    });


}

/**
 * update person password
 *
 * @param req
 * @param res
 */
export function updatePersonPassword(req: Req, res: Res): void {

    const personId = new ObjectId(req.params.id);
    const password: string = req.body.password;

    // Request password reset
    personService.updatePersonPassword(personId, password, (error: ResponseError, person: Person) => {

        if (error) {
            return setupResponseCallback(res)(error);
        }

        // Log event and return - don't "leak" user details
        const activity = activityLogService.buildActivityEvent("PASSWORD_UPDATE", person._id, "Person");
        activityLogService.createActivityLog(person, req.ip, activity, () => {
            return setupResponseCallback(res)(null, {});
        });
    });
}

/**
 * Request reset password email
 *
 * @param req
 * @param res
 * @returns {*}
 */
export function requestResetPassword(req: Req, res: Res): void {

    let email = req.body.email;

    if (!email) {
        res.status(400).json({ message: "User email not specified" });
        return;
    }

    email = email.trim().toLowerCase();

    // Request password reset
    personService.requestResetPassword(email, res, (error: ResponseError, person: Person) => {

        if (error) {
            return res.status(422).json(createFormFieldErrorMessage("email", "Unable to reset password."));
        }

        // Log event and return - don't "leak" user details
        const activity = activityLogService.buildActivityEvent("PASSWORD_RESET_REQUEST", person._id, "Person");
        activityLogService.createActivityLog(person, req.ip, activity, () => {
            res.status(200).json({});
        });
    });
}

/**
 * Resend confirm account email
 *
 * @param req
 * @param res
 * @returns {*}
 */
export function resendConfirmAccountEmail(req: Req, res: Res): void {

    personService.resendConfirmAccountEmail(req.user._id, res, setupResponseCallback(res));
}

/**
 * Update user password
 *
 * @param req
 * @param res
 */
export function resetPassword(req: Req, res: Res): void {

    const forgotKey = req.body.forgotKey;

    PersonModel.findOne({
        forgotKey: forgotKey
    }, (error, person) => {

        if (error) {
            return res.status(500).json(error);
        }

        // Confirm person was found with matching activation key
        if (!person) {
            return res.status(422).json(createFormFieldErrorMessage("password", "Invalid forgot password key."));
        }

        // Check if forgot key is still valid
        const now = new Date();
        if (person.forgotKeyExpiryDate.getTime() !== now.getTime() && (person.forgotKeyExpiryDate < now)) {
            return res.status(422).json(createFormFieldErrorMessage("password", "Forgot password key has expired."));
        }

        // Check passwords match
        const password = String(req.body.password);
        const passwordMatch = String(req.body.passwordConfirm);

        if (password !== passwordMatch) {
            return res.status(422).json(createFormFieldErrorMessage("password", "Passwords do not match."));
        }

        personService.updatePersonPassword(person._id, password, (updateError) => {

            if (updateError) {
                return res.status(500).json(updateError);
            }

            person.passwordResetRequired = false;
            person.forgotKeyExpiryDate = new Date();

            // TODO remove cow head here (convert to async to avoid nested callbacks)
            // Update forgot details on person
            person.save((saveError: ResponseError) => {

                if (saveError) {
                    return res.status(500).json(saveError);
                }

                // Log event and return
                const activity = activityLogService.buildActivityEvent("PASSWORD_RESET", person._id, "Person");
                activityLogService.createActivityLog(person, req.ip, activity, () => {
                    res.status(200).json({});
                });
            });
        });
    });
}

/**
 * Get current user
 *
 * @param req
 * @param res
 */
export function me(req: Req, res: Res): void {

    // User has already authenticated, return user
    if (req.user) {
        res.status(200).json(req.user);
    }
    // User is not authenticated...
    else {
        res.json({});
    }
}

/**
 * Set user password - called during account activation flow
 *
 * @param req {Req}
 * @param res {Res}
 */
export function setPersonPassword(req: Req, res: Res): void {

    const activationKey = req.body.activationKey;
    const password = req.body.password;

    // Activate account
    personService.setPersonPassword(activationKey, password, (error: ResponseError, person: Person) => {

        if (error) {
            return setupResponseCallback(res)(error);
        }

        // Log event and return - don't "leak" user details
        const activity = activityLogService.buildActivityEvent("ACCOUNT_ACTIVATE", person._id, "Person");
        activityLogService.createActivityLog(person, req.ip, activity, () => {
            setupResponseCallback(res)(null, {});
        });
    });
}

/**
 * PRIVATES
 */

/**
 * Create customer error message for the specified field in
 * the format:
 *
 * {
 *     message: "My error message"
 * }
 * @param fieldName
 * @param message
 * @returns {{errors: {}}}
 */
function createFormFieldErrorMessage(fieldName: string, message: string) {

    // NOTE: Format here must match format in CCExpressUtils formatFormFieldErrors for correct parsing on FE.

    let errors = {};
    errors[fieldName] = {
        msg: message
    };

    return errors;
}
