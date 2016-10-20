/**
 * Plugin for adding author and editor (updater) IDs
 */
import { Types, Schema } from "mongoose";

export interface Contributors {
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
}

export const contributors = (schema: Schema) => {

    /**
     * Add author to schema
     */
    schema.add({
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Person"
        }
    });

    /**
     * Add editor to schema
     */
    schema.add({
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "Person"
        }
    });
};
