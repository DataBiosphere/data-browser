/**
 * Auth Model
 */
import { Schema, model } from "mongoose";
import { Auth } from "./auth-definition";
import { timestamps } from "../plugin";

const AuthSchema = new Schema({
    current: {
        type: Boolean,
        default: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        required: true,
        index: true
    }
});
AuthSchema.plugin(timestamps, { index: true });
AuthSchema.index({ personId: 1, current: 1 });

export const AuthModel = model<Auth>("Auth", AuthSchema);