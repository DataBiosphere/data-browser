/**
 * Pipe for formatting age unit to seconds.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

// App dependencies
import { AgeUnit } from "../age-unit.model";

@Pipe({
    name: "ageUnitInSeconds"
})
export class AgeUnitInSeconds implements PipeTransform {

    transform(age: number, ageUnit: AgeUnit): number {

        const timeUnitInSeconds = {
            "week": 604800,
            "month": 2628000,
            "year": 31536000
        };

        return age * timeUnitInSeconds[ageUnit];
    }
}
