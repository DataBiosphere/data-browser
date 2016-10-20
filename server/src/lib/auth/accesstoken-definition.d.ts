/**
 * Access Token Definitions
 */
import { Document, Types } from "mongoose";
import { Timestamps } from "../plugin";

export interface AccessTokenPartial {
    _id?: Types.ObjectId;
    user?: any;
    token?: string;
    expirationDate?: Date;
    used?: boolean;
    usedDate?: Date;
}

export interface AccessToken extends Document, Timestamps {
    user: any;
    token: string;
    expirationDate: Date;
    used: boolean;
    usedDate: Date;
}