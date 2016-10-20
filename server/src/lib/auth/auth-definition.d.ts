/**
 * Auth Definitions
 */
import { Timestamps } from "../plugin";
import { Document, Types } from "mongoose";

interface AuthPartial extends Timestamps {
    _id?: Types.ObjectId;
    current?: boolean;
    hashedPassword?: string;
    salt?: string;
    person?: Types.ObjectId;
}

interface Auth extends Document, Timestamps {
    current: boolean;
    hashedPassword: string;
    salt: string;
    person: Types.ObjectId;
}
