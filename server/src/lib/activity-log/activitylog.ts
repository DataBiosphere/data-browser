/**
 * Activity log model
 */

/**
 * Interfaces
 */
import { ActivityLog } from "./activitylog-definition";

/**
 * Dependencies
 */
import { Schema, model } from "mongoose";
import { PERSON_ROLES } from "../person/person";

/**
 * Plugins
 */
import { timestamps } from "../plugin";

// Constants
const ACTIVITY_EVENTS = [
    "LOGIN", "LOGOUT",
    "PERSON_CREATE", "PERSON_UPDATE",
    "USER_INVITE", "USER_RESEND_INVITE",
    "ACCOUNT_ACTIVATE",
    "SUSPEND_USER", "UNSUSPEND_USER",
    "PASSWORD_RESET_REQUEST", "PASSWORD_RESET", "PASSWORD_UPDATE"
];

const ActivityLogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Person"
    },
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: PERSON_ROLES
    },
    email: String,
    activity: {
        type: String,
        enum: ACTIVITY_EVENTS
    },
    entityType: String,
    entityId: Schema.Types.ObjectId,
    ipAddress: String
});


// Add create and update timestamps to schema
ActivityLogSchema.plugin(timestamps, {
    index: true
});

export const ActivityLogModel = model<ActivityLog>("ActivityLog", ActivityLogSchema);
