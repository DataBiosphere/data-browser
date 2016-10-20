import { Timestamps, Contributors } from "../plugin";

import { Document, Types } from "mongoose";

type PERSON_ROLES = "ADMIN" | "USER";

export interface Address {
    line1: string;
    city: string;
    zip: string;
    state: string;
    country?: string;
}

export interface PersonPartial extends Timestamps, Contributors {
    _id?: Types.ObjectId;
    active?: boolean;
    activationKey?: string;
    activationKeyExpiryDate?: Date;
    email?: string;
    emailConfirmed?: boolean;
    firstName?: string;
    invited?: boolean;
    lastName?: string;
    forgotKey?: string;
    forgotKeyExpiryDate?: Date;
    lastLogin?: Date;
    lastSeen?: Date;
    provider?: string;
    role?: PERSON_ROLES;
    status?: number;
    contactInfo?: {
        primaryPhone?: string;
        mobilePhone?: string;
        address?: Address;
    };
    passwordResetRequired?: boolean;
    client?: Types.ObjectId;

    // virtuals
    password?: string;
}

export interface Person extends Document, Timestamps, Contributors {
    active: boolean;
    activationKey: string;
    activationKeyExpiryDate: Date;
    email: string;
    emailConfirmed: boolean;
    firstName: string;
    invited: boolean;
    lastName: string;
    forgotKey: string;
    forgotKeyExpiryDate: Date;
    lastLogin: Date;
    lastSeen: Date;
    provider: string;
    role: PERSON_ROLES;
    status: number;
    contactInfo: {
        primaryPhone: string;
        primaryPhoneExt: string;
        mobilePhone: string;
        address: Address;
    };
    passwordResetRequired: boolean;
    client: Types.ObjectId;

    toObject(): PersonPartial;
}
