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

    /**
     * @param {boolean} v2 - true if running in v2 environment
     * @param {any} row - data modelling row in current selected table.
     */
    constructor(v2: boolean, row: any) {

        super(v2, row);
    }

    /**
     * Return the version of the row, optimized for display in the data table.
     */
    public mapRow(): EntityRow {

        return Object.assign({}, super.mapRow(), {
            entryId: this.row.entryId,
            projectShortname: getUnspecifiedIfNullValue(this.projects.projectShortname)
        });
    }
}
