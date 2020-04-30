/**
 * Pipe for formatting age in seconds to age unit.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

// App dependencies
import { AgeUnit } from "../age-unit.model";

@Pipe({
    name: "ageInAgeUnit"
})
export class AgeInAgeUnit implements PipeTransform {

    transform(age: number, ageUnit: AgeUnit): number {
        
        if ( !age && age !== 0 ) {
            return;
        }

        const timeUnitInSeconds = {
            "week": 604800,
            "month": 2628000,
            "year": 31536000
        };

        return age / timeUnitInSeconds[ageUnit];
    }
}
