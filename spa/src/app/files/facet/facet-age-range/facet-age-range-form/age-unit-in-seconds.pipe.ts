/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Pipe for formatting age unit to seconds.
 */

// Core dependencies
import { Pipe, PipeTransform } from "@angular/core";

// App dependencies
import { AgeUnit } from "../age-unit.model";
import { TimeUnitInSeconds } from "../time-unit-in-seconds.model";

@Pipe({
    name: "ageUnitInSeconds",
})
export class AgeUnitInSeconds implements PipeTransform {
    transform(age: number, ageUnit: AgeUnit): number {
        return age * TimeUnitInSeconds[ageUnit.toUpperCase()];
    }
}
