/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Validator for facet age range. Returns true if max value is greater than min value.
 */

// Core dependencies
import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * Return min max validator result.
 *
 * @returns {ValidatorFn}
 * @constructor
 */
export function MinMaxValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        
        const ageMin = control.value.ageMin;
        const ageMax = control.value.ageMax;

        if ( (!ageMin && ageMin !== 0) || (!ageMax && ageMax !== 0) ) {
            return null;
        }

        if ( ageMin > ageMax ) {
            return {"minMax": {value: control.value}}
        }

        return null;
    };
}
