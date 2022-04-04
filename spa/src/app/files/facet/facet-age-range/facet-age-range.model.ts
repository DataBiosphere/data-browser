/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a facet that contains an age range value.
 */

// App dependencies
import { Facet } from "../facet.model";
import { AgeRange } from "./age-range.model";

export class FacetAgeRange implements Facet {
    /**
     * @param {string} name
     * @param {AgeRange} ageRange
     */
    constructor(public name: string, public ageRange: AgeRange) {}

    /**
     * Reset the age range.
     *
     * @returns {FacetAgeRange}
     */
    public clearAgeRange(): FacetAgeRange {
        return new FacetAgeRange(this.name, {} as AgeRange);
    }

    /**
     * Update age range - return new value object so change detectors are triggered.
     *
     * @param {AgeRange} ageRange
     * @returns {FacetAgeRange}
     */
    public setAgeRange(ageRange: AgeRange): FacetAgeRange {
        return new FacetAgeRange(this.name, ageRange);
    }
}
