/**
 * One time use access token
 */
import { AccessToken } from "./accesstoken-definition";

/**
 * Plugins
 */
import { timestamps } from "./../plugin";

/**
 * Dependencies
 */
import { Schema, model } from "mongoose";


/**
 * AccessToken Schema
 * @type {"mongoose".Schema}
 */
const AccessTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Person"
    },
    token: String,
    expirationDate: Date,
    used: Boolean,
    usedDate: Date
});

// Add create and update timestamps to schema
AccessTokenSchema.plugin(timestamps, {
    index: true
});

export const AccessTokenModel = model<AccessToken>("AccessToken", AccessTokenSchema);
