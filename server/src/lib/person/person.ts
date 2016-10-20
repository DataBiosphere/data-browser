/**
 * Person model
 */

/**
 * Interfaces
 */
import { Person } from "./person-definition";

/**
 * Plugins
 */
import { timestamps, contributors } from "../plugin";

/**
 * Dependencies
 */
import { Schema, model } from "mongoose";

// Constants
export const PERSON_ROLES = ["ADMIN", "USER"];
export const EDITABLE_FIELDS = ["firstName", "lastName", "email"];

// Status codes
// 0 - OK
// 1 - Suspended
export const STATUS = {
    OK: 0,
    SUSPENDED: 1
};

const BOOLEAN_FALSE_DEFAULT = {
    type: Boolean,
    default: false
};
const STRING_EMPTY_DEFAULT = {
    type: String,
    default: ""
};

/**
 * Person Schema
 */
let PersonSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    activationKey: String,
    activationKeyExpiryDate: Date,
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailConfirmed: BOOLEAN_FALSE_DEFAULT,
    firstName: String,
    forgotKey: String,
    forgotKeyExpiryDate: Date,
    contactInfo: {
        primaryPhone: STRING_EMPTY_DEFAULT,
        primaryPhoneExt: STRING_EMPTY_DEFAULT,
        mobilePhone: STRING_EMPTY_DEFAULT,
        address: {
            line1: String,
            city: String,
            zip: String,
            state: String,
            country: String
        }
    },
    lastLogin: Date,
    lastName: String,
    lastSeen: Date,
    provider: {
        type: String,
        default: "local"
    },
    role: {
        type: String,
        enum: PERSON_ROLES,
        default: "USER"
    },
    status: {
        type: Number,
        default: STATUS.OK
    },
    passwordResetRequired: {
        type: Boolean,
        default: false
    },
    invited: BOOLEAN_FALSE_DEFAULT
});

// Add create and update timestamps to schema
PersonSchema.plugin(timestamps, {
    index: true
});

// Add author/editor to schema
PersonSchema.plugin(contributors, {
    index: true
});

/**
 * Validate empty email
 */
PersonSchema.path("email")
    .validate(function(email) {
        return email.length;
    }, "Email cannot be blank");

/**
 * Validate email is not taken
 */
PersonSchema.path("email")
    .validate(function(value, respond) {

        this.constructor.findOne({ email: value }, (err, user) => {

            if (err) {
                throw err;
            }

            if (user) {
                if (this._id.equals(user._id)) {
                    return respond(true);
                }
                return respond(false);
            }

            respond(true);
        });

    }, "The specified email address is already in use.");

/**
 * Pre-save hooks
 */
PersonSchema.pre("save", function(next) {
    this.email = this.email.toLowerCase();
    next();
});

export const PersonModel = model<Person>("Person", PersonSchema);
