/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Pipe for formatting age in one unit to another.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

// App dependencies
import { AgeUnit } from "../age-unit.model";
import { TimeUnitInSeconds } from "../time-unit-in-seconds.model";

@Pipe({
    name: "ageUnitInAgeUnit",
})
export class AgeUnitInAgeUnit implements PipeTransform {
    transform(age: number, prevAgeUnit: AgeUnit, nextAgeUnit: AgeUnit): number {
        if (!age && age !== 0) {
            return;
        }

        const conversion =
            (age * TimeUnitInSeconds[prevAgeUnit.toUpperCase()]) /
            TimeUnitInSeconds[nextAgeUnit.toUpperCase()];

        return Math.round(conversion);
    }
}
