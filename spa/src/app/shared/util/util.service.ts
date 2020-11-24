/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * General utility service.
 */

// Core dependencies
import { Injectable } from "@angular/core";

@Injectable()
export class UtilService {

    /**
     * Returns true if specified object is an empty object.
     *
     * @param {any} obj
     * @returns {boolean}
     */
    public static isEmpty(obj) {

        return !obj || Object.keys(obj).length === 0 && obj.constructor === Object;
    }
}
