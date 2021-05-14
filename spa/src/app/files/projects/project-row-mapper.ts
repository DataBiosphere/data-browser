/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Class responsible for mapping response returned from projects end point, to model appropriate for display in samples
 * data table.
 */

// App dependencies
import { EntityRow } from "../entities/entity-row.model";
import { ProjectMatrixMapper } from "../project-matrix/project-matrix-mapper";
import { FileTypeSummariesRowMapper } from "../table/file-type-summaries-row-mapper";
import { getUnspecifiedIfNullValue } from "../table/table-methods";

export class ProjectRowMapper extends FileTypeSummariesRowMapper {

    // Locals
    private matrixMapper = new ProjectMatrixMapper();

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

        // Bind contributor and CDP generated matrices 
        const contributorMatrices = this.matrixMapper.bindMatrices(this.projects.contributorMatrices);
        const matrices = this.matrixMapper.bindMatrices(this.projects.matrices);
        
        return Object.assign({}, super.mapRow(), {
            contributorMatrices,
            entryId: this.row.entryId,
            matrices,
            projectShortname: getUnspecifiedIfNullValue(this.projects.projectShortname)
        });
    }
}
