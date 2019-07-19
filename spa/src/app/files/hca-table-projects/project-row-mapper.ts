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

    /**
     * @param {any} row - data modelling row in current selected table.
     */
    constructor(row: any) {

        super(row);
    }

    /**
     * Return the version of the row, optimized for display in the data table.
     */
    public mapRow(): EntityRow {

        return Object.assign({}, super.mapRow(), {
            donorCount: (((this.row.donorOrganisms || [])[0] || {}).id || []).length, // Donor count is the number of IDs in the id field of donor organisms
            entryId: this.row.entryId,
            projectShortname: getUnspecifiedIfNullValue(this.projects.projectShortname)
        });
    }
}
