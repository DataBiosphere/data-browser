/**
 * Pipe for formatting age in one unit to another.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

// App dependencies
import { AgeUnit } from "../age-unit.model";

@Pipe({
    name: "ageUnitInAgeUnit"
})
export class AgeUnitInAgeUnit implements PipeTransform {

    transform(age: number, prevAgeUnit: AgeUnit, nextAgeUnit: AgeUnit): number {
        
        if ( !age && age !== 0 ) {
            return;
        }

        const timeUnitInSeconds = {
            "week": 604800,
            "month": 2628000,
            "year": 31536000
        };

        const conversion = age * timeUnitInSeconds[prevAgeUnit] / timeUnitInSeconds[nextAgeUnit];

        return Math.round(conversion);
    }
}
