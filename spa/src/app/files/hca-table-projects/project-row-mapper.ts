/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Class responsible for mapping response returned from projects end point, to model appropriate for display in samples
 * data table.
 */

// App dependencies
import { getUnspecifiedIfNullValue } from "../table/table-methods";
import { EntityRow } from "../table/entity-row.model";
import { FileTypeSummariesRowMapper } from "../table/file-type-summaries-row-mapper";

export class ProjectRowMapper extends FileTypeSummariesRowMapper {

    private projectSummary;
    
    /**
     * @param {any} row - data modelling row in current selected table.
     */
    constructor(row: any) {
        super(row);
        this.projectSummary = row.projectSummary;
    }

    /**
     * Return the version of the row, optimized for display in the data table.
     */
    public mapRow(): EntityRow {

        return Object.assign({}, super.mapRow(), {
            donorCount: getUnspecifiedIfNullValue(this.projectSummary.donorCount),
            entryId: this.row.entryId,
            libraryConstructionApproach: getUnspecifiedIfNullValue(this.projectSummary.libraryConstructionApproach),
            projectShortname: getUnspecifiedIfNullValue(this.projects.projectShortname)
        });
    }
}
