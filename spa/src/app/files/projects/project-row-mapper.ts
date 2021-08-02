/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Class responsible for mapping response returned from projects end point, to model appropriate for display in samples
 * data table.
 */

// App dependencies
import { EntityRow } from "../entities/entity-row.model";
import { EntityRowMapper } from "../entities/entity-row-mapper";
import { FileTypeSummary } from "../file-summary/file-type-summary";
import { ProjectMatrixMapper } from "../project-matrix/project-matrix-mapper";
import { getUnspecifiedIfNullValue } from "../table/table-methods";

export class ProjectRowMapper extends EntityRowMapper {

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

        // Calculate file type summaries
        const fileTypeCounts = this.buildFileTypeCounts(this.row.fileTypeSummaries);
        
        return Object.assign({}, super.mapRow(), {
            contributorMatrices,
            entryId: this.row.entryId,
            fileTypeCounts,
            matrices,
            projectShortname: getUnspecifiedIfNullValue(this.projects.projectShortname)
        });
    }


    /**
     * Sum counts for each file format.
     *
     * @param {FileTypeSummary[]} fileTypeSummaries
     */
    private buildFileTypeCounts(fileTypeSummaries: FileTypeSummary[]): Map<string, number> {

        return (fileTypeSummaries || []).reduce((acc, fileTypeSummary) => {

            const count = fileTypeSummary.count || 0;
            const fileType = fileTypeSummary.fileType;

            if ( acc.has(fileType) ) {
                const currentCount = acc.get(fileType);
                acc.set(fileType, currentCount + count);
            }
            else {
                acc.set(fileType, count);
            }

            return acc;

        }, new Map());
    }
}
