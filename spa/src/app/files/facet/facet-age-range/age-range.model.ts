/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of an age range in a facet.
 */

// App dependencies
import { AgeUnit } from "./age-unit.model";

export interface AgeRange {
    ageMax?: number;
    ageMin?: number;
    ageUnit: AgeUnit;
}
