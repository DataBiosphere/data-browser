/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Pipe for formatting age in seconds to age unit.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

// App dependencies
import { AgeUnit } from "../age-unit.model";
import { TimeUnitInSeconds } from "../time-unit-in-seconds.model";

@Pipe({
    name: "ageInAgeUnit",
})
export class AgeInAgeUnit implements PipeTransform {
    transform(age: number, ageUnit: AgeUnit): number {
        if (!age && age !== 0) {
            return;
        }

        return age / TimeUnitInSeconds[ageUnit.toUpperCase()];
    }
}
