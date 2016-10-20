/**
 * Created and updated timestamps plugin
 */
import { Schema } from "mongoose";

export interface Timestamps {
    createdAt?: Date;
    updatedAt?: Date;
}

export const timestamps = (schema: Schema, options?: {index?: boolean}) => {


    schema.add({ createdAt: Date });
    schema.add({ updatedAt: Date });

    schema.pre("save", function(next) {

        this.updatedAt = new Date();

        if (!this.createdAt) {
            this.createdAt = this.updatedAt;
        }
        next();
    });

    if (options && options.index) {
        schema.path("createdAt").index(options.index);
        schema.path("updatedAt").index(options.index);
    }
};
