/**
 * Person Validator
 */
import { setupResponseCallback, ValidationError } from "cc-express-utils";
import { Response as Res, NextFunction } from "express";
import { QueryModel } from "cc-qm";
import { findPerson } from "./person-dao";
import { Req } from "../../boardwalk";

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {any}
 */
export function validateOnCreate(req: Req, res: Res, next: NextFunction): void {

    validatePerson(req, res, next);
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {any}
 */
export function validateOnUpdate(req: Req, res: Res, next: NextFunction): void {

    validatePerson(req, res, next);
}

/**
 * PRIVATES
 */

/**
 * Execute validations shared by both create and update flows
 */
function validatePerson(req: Req, res: Res, next: NextFunction): void {

    let errors = [];

    req.checkBody("firstName", "First name is required").notEmpty();
    req.checkBody("lastName", "Last name is required").notEmpty();

    if (req.validationErrors()) {
        errors = errors.concat(req.validationErrors());
    }

    if (req.body.email) {

        // check if the email is already taken
        checkEmailExist(req.body._id, req.body.email, res, (emailExistsError) => {

            if (emailExistsError) {
                errors.push(emailExistsError);
            }

            if (errors.length) {
                const validationErr = new ValidationError(errors);
                return setupResponseCallback(res)(validationErr);
            }
            else {
                next();
            }
        });
    }
    else {

        errors.push({
            param: "email",
            msg: "Email is required"
        });
        const validationErr = new ValidationError(errors);
        setupResponseCallback(res)(validationErr);
    }
}

/**
 * Checks if a person exists with a given email
 * Responds with 500 if server/db error, validation error
 * is passed to callback
 *
 * @param personId
 * @param email
 * @param res
 * @param next
 */
function checkEmailExist(personId, email, res, next): void {

    email = email.toLowerCase();
    const qm = new QueryModel();

    // If this is an edit, we only want to check if email is taken by a different user
    if (!!personId) {
        qm.addNotQueryFilter("_id", personId);
    }

    qm.addEqualsQueryFilter("email", email);
    findPerson(qm, function(error, person) {

        if (error) {
            return setupResponseCallback(res)(error);
        }

        if (!person) {
            return next();
        }

        if (person && person.passwordResetRequired) {

            return res.status(422).json({
                msg: "PASSWORD_RESET_REQUIRED"
            });
        }

        const emailExistsError = {
            param: "email",
            msg: "Email already exists in system.",
            value: email
        };
        next(emailExistsError);
    });
}

