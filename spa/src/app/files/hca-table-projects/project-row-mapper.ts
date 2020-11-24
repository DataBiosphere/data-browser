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
import { UtilService } from "../../shared/util/util.service";

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

        // Using empty object here to temporarily represent the existence of contributor matrices. TODO update with DB 1315 
        const contributorMatrices = 
            UtilService.isEmpty(this.projects.contributorMatrices) ? [] : [{}];

        // Using empty object here to temporarily represent the existence of matrices. TODO update with DB 1315 
        const matrices =
            UtilService.isEmpty(this.projects.matrices) ? [] : [{}];

        return Object.assign({}, super.mapRow(), {
            contributorMatrices,
            entryId: this.row.entryId,
            matrices,
            projectShortname: getUnspecifiedIfNullValue(this.projects.projectShortname)
        });
    }
}
