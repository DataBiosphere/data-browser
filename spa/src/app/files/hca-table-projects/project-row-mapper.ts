/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Class responsible for mapping response returned from projects end point, to model appropriate for display in samples
 * data table.
 */

// App dependencies
import { getUnspecifiedIfEmpty, getUnspecifiedIfNullValue } from "../table/table-methods";
import { EntityRow } from "../table/entity-row.model";
import { FileTypeSummariesRowMapper } from "../table/file-type-summaries-row-mapper";

export class ProjectRowMapper extends FileTypeSummariesRowMapper {

    private projectSummary;
    
    /**
     * @param {any} row - data modelling row in current selected table.
     */
    constructor(row: any) {

        super(row);

        // Protect against a null project summary value here by defaulting to empty object. This should only ever
        // occur in an error / bad data case.
        this.projectSummary = row.projectSummary || {};
    }

    /**
     * Return the version of the row, optimized for display in the data table.
     */
    public mapRow(): EntityRow {

        // Library construction approach should be displayed as "Unspecified" if it is null, or empty array
        const libraryConstructionApproach = this.projectSummary.libraryConstructionApproach;
        const mappedLibraryConstructionApproach = Array.isArray(libraryConstructionApproach) ?
            getUnspecifiedIfEmpty(libraryConstructionApproach) :
            getUnspecifiedIfNullValue(libraryConstructionApproach);

        return Object.assign({}, super.mapRow(), {
            donorCount: getUnspecifiedIfNullValue(this.projectSummary.donorCount),
            entryId: this.row.entryId,
            libraryConstructionApproach: mappedLibraryConstructionApproach,
            projectShortname: getUnspecifiedIfNullValue(this.projects.projectShortname)
        });
    }
}
