/**
 * Activity log types
 */

import { Timestamps, Contributors } from "../plugin";
import { Document, Types } from "mongoose";

import { PERSON_ROLES } from "../person/person-definition";

type ObjectId = Types.ObjectId;


type ACTIVITY_EVENTS =
    "LOGIN" | "LOGIN_FAILED" | "LOGOUT" |
        "INVITE_USER" | "RESEND_INVITE" |
        "SUSPEND_USER" | "UNSUSPEND_USER";

export interface ActivityLogPartial extends Timestamps, Contributors {
    _id?: ObjectId;
    user?: ObjectId;
    firstName?: string;
    lastName?: string;
    role?: PERSON_ROLES;
    email?: string;
    activity?: ACTIVITY_EVENTS;
    entityId?: ObjectId;
    entityType?: string;
    ipAddress?: string;
}

export interface ActivityEvent {
    eventType: ACTIVITY_EVENTS;
    entityId?: ObjectId;
    entityType?: string;
}

export interface ActivityLog extends Document, Timestamps, Contributors {
    _id: ObjectId;
    user: ObjectId;
    firstName: string;
    lastName: string;
    role: PERSON_ROLES;
    email: string;
    client: ObjectId;
    activity: ACTIVITY_EVENTS;
    entityId?: ObjectId;
    entityType?: string;
    ipAddress: string;

    toObject(): ActivityLogPartial;
}

