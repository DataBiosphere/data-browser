/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of selected range value (eg age range).
 */

// App dependencies
import { SearchTerm } from "./search-term.model";
import { AgeRange } from "../facet/facet-age-range/age-range.model";
import { AgeInAgeUnit } from "../facet/facet-age-range/facet-age-range-form/age-in-age-unit.pipe";

export class SearchAgeRange implements SearchTerm {
    /**
     * @param {string} facetName
     * @param {AgeRange} ageRange
     */
    constructor(public readonly facetName: string, public ageRange: AgeRange) {}

    /**
     * We never user display age ranges in the search autosuggest (where this count would be used).
     *
     * @returns {number}
     */
    public getCount(): number {
        throw `Error attempting to access count for age range search term "${this.facetName}".`;
    }

    /**
     * The display value of a search range is the min and max values, and age unit.
     *
     * @returns {string}
     */
    public getDisplayValue(): string {
        const ageInAgeUnit = new AgeInAgeUnit();
        const ageUnit = this.ageRange.ageUnit;
        const minDisplay = ageInAgeUnit.transform(
            this.ageRange.ageMin,
            ageUnit
        );
        const maxDisplay = ageInAgeUnit.transform(
            this.ageRange.ageMax,
            ageUnit
        );
        const ageUnitDisplay = maxDisplay === 1 ? ageUnit : `${ageUnit}s`;
        return `between ${minDisplay} and ${maxDisplay} ${ageUnitDisplay}`;
    }

    /**
     * Return a unique value to identify this search range by - convenience method, used when iterating through sets of
     * search terms that are grouped by facet name or entity name.
     *
     * @returns {string}
     */
    getId(): string {
        return `${this.getSearchKey()}:${this.getSearchValue()}`;
    }

    /**
     * The search key of a search range is its facet name. This value is used when building the filter query string
     * parameter.
     *
     * @returns {string}
     */
    public getSearchKey(): string {
        return this.facetName;
    }

    /**
     * The search value of an entity is it age range. This value is used internally to check equality, as well as when
     * updating the filter query string parameter on facet selection.
     *
     * @returns {string}
     */
    public getSearchValue(): any {
        return this.ageRange;
    }

    /**
     * Use the min and max values when building up query string filter value. This value is not used when updating the
     * location according to the set of selected facets. The location is updated with the front-end representation of
     * the selected set of facets whereas this method translates the front-end representation when facets are marshalled
     * for request functionality.
     *
     * @returns {any}
     */
    public getFilterParameterValue(): any {
        return [this.ageRange.ageMin, this.ageRange.ageMax];
    }

    /**
     * The sort value of a search range is its display value;
     *
     * @returns {string}
     */
    public getSortValue(): string {
        return this.getDisplayValue();
    }
}
