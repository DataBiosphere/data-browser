/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for sorting term sortable objects. 
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { TermNameSortType } from "./term-name-sort-type.model";
import { TermSortable } from "./term-sortable.model";
import { AgeUnit } from "../facet/facet-age-range/age-unit.model";

// App dependencies

@Injectable()
export class TermSortService {

    private readonly SORT_TYPE_BY_SORT_KEY = {
        [FileFacetName.ORGANISM_AGE]: TermNameSortType.NUMBER_RANGE
    };

    /**
     * Parse term name according to the term type for the specified facet (string or number range) then sort list of
     * terms.
     * 
     * @param {string} facetName
     * @param {Term[]} terms
     */
    public sortTerms(facetName: string, terms: TermSortable[]) {

        // Determine the function to use to format term value into sortable value
        const parseFn = this.getTermNameSortFormatter(facetName);

        // Sort it!
        terms.sort((t0: TermSortable, t1: TermSortable) => {

            const sortValue0 = parseFn(t0.getSortValue());
            const sortValue1 = parseFn(t1.getSortValue());
            if ( sortValue0 > sortValue1 ) {
                return 1;
            }
            if ( sortValue0 < sortValue1 ) {
                return -1;
            }
            return 0;
        });
    }

    /**
     * Return the term name sort formatting function for the specified facet.
     * 
     * @param {string} facetName
     * @returns {function}
     */
    private getTermNameSortFormatter(facetName: string): Function {

        const termType = this.SORT_TYPE_BY_SORT_KEY[facetName];
        if ( termType === TermNameSortType.NUMBER_RANGE ) {
            return this.formatNumberRangeForSort;
        }
        if ( termType === TermNameSortType.AGE_UNIT ) {
            return this.formatAgeUnitForSort;
        }
        return this.formatStringForSort;
    }

    /**
     * Convert the specified age unit term names into a sort-appropriate format.
     *
     * @param {string} termName
     * @returns {number}
     */
    private formatAgeUnitForSort(termName: string): number {

        const units = [
            AgeUnit.day,
            AgeUnit.week,
            AgeUnit.month,
            AgeUnit.year
        ];
        const index = units.indexOf(AgeUnit[termName]);
        return (index === -1) ?
            units.length : // If age unit is not recognised (eg "Unspecified"), place at end of set
            index;
    }

    /**
     * Convert the specified number range term name into a sort-appropriate format.
     * 
     * @param {string} termName
     * @returns {number}
     */
    private formatNumberRangeForSort(termName: string): number {

        // Number range can either be a single number (eg "3") or a number range (eg "3-10')
        const sortValue0 = termName.indexOf("-") >= 0 ?
            termName.split("-")[0].trim() :
            termName;
        
        return parseInt(sortValue0, 10);
    }

    /**
     * Convert the specified string term name into a sort-appropriate format.
     *
     * @param {string} termName
     * @returns {string}
     */
    private formatStringForSort(termName: string): string {
        
        return termName.toLowerCase();
    }
}

