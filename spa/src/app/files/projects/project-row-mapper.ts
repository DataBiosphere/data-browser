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
import { ProjectMatrixView } from "../project-matrix/project-matrix-view.model";
import { FileTypeSummariesRowMapper } from "../table/file-type-summaries-row-mapper";
import { Project } from "../shared/project.model";
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
     * 
     * @param {Project} projectOverrides - required for mapping project matrix analysis portals from projects edits
     * JSON; project detail only (not currently required for projects table).
     */
    public mapRow(projectOverrides?: Project): EntityRow {

        // Bind contributor and CDP generated matrices 
        const contributorMatrices = this.matrixMapper.bindMatrices(this.projects.contributorMatrices);
        if ( projectOverrides && projectOverrides.contributorMatrices?.length ) {
            this.addContributorMatricesVisualizations(contributorMatrices, projectOverrides.contributorMatrices);
        }
        const matrices = this.matrixMapper.bindMatrices(this.projects.matrices);
        
        return Object.assign({}, super.mapRow(), {
            contributorMatrices,
            entryId: this.row.entryId,
            matrices,
            projectShortname: getUnspecifiedIfNullValue(this.projects.projectShortname)
        });
    }

    /**
     * Match the contributor matrices visualization tools specified in the project overrides with their 
     * corresponding matrices.
     * 
     * @param {ProjectMatrixView[]} contributorMatrices
     * @param {any} matrixOverrides
     */
    private addContributorMatricesVisualizations(
        contributorMatrices: ProjectMatrixView[], matrixOverrides: ProjectMatrixView[]) {

        const matricesById = contributorMatrices.reduce((accum, matrix) => {
            accum.set(matrix.uuid, matrix);
            return accum;
        }, new Map());
        matrixOverrides.forEach(override => {

            const matrix = matricesById.get(override.uuid);
            if ( matrix ) {
                matrix.analysisPortals = override.analysisPortals;
            }
        });
    }
}
