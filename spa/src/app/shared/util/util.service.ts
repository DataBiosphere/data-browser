/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * General utility service.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class UtilService {

    /**
     * Returns true if specified object is an empty object.
     *
     * @param {any} obj
     * @returns {boolean}
     */
    public isEmpty(obj) {
        
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) )
                return false;
        }

        return true;
    }

}
