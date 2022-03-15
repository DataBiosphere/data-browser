/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Class responsible for mapping response returned from projects end point, to model appropriate for display in samples
 * data table.
 */

// Core dependencies
import { DatePipe } from "@angular/common";

// App dependencies
import { EntityRow } from "../entities/entity-row.model";
import { EntityRowMapper } from "../entities/entity-row-mapper";
import { FileTypeSummaryResponse } from "../file-summary/file-type-summary-response.model";
import { ProjectMatrixMapper } from "../project-matrix/project-matrix-mapper";
import { getUnspecifiedIfNullValue } from "../table/table-methods";

export class ProjectRowMapper extends EntityRowMapper {

    // Constants
    private DATE_FORMAT = "yyyy-MM-dd HH:mm 'GMT'";
    private DATE_TZ = "GMT";
    
    // Locals
    private matrixMapper = new ProjectMatrixMapper();r
    private datePipe = new DatePipe("en-US");

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
        const contributorMatrices = this.matrixMapper.bindMatrices(this.projects.contributedAnalyses);
        const matrices = this.matrixMapper.bindMatrices(this.projects.matrices);

        // Calculate file type summaries
        const fileTypeCounts = this.buildFileTypeCounts(this.row.fileTypeSummaries);
        
        // Map dates
        const dates = this.row.dates?.[0] ?? [];
        const aggregateLastModifiedDate = this.mapDate(dates.aggregateLastModifiedDate);
        const aggregateSubmissionDate = this.mapDate(dates.aggregateSubmissionDate);
        
        return Object.assign({}, super.mapRow(), {
            aggregateLastModifiedDate: getUnspecifiedIfNullValue(aggregateLastModifiedDate),
            aggregateSubmissionDate: getUnspecifiedIfNullValue(aggregateSubmissionDate),
            contributorMatrices,
            entryId: this.row.entryId,
            fileTypeCounts,
            matrices,
            projectShortname: getUnspecifiedIfNullValue(this.projects.projectShortname)
        });
    }

    /**
     * Map specified date as formatted string.
     * 
     * @param {string} dateString
     * @returns {string}
     */
    private mapDate(dateString: string): string {

        if ( !dateString ) {
            return "";
        }
        const date = new Date(dateString);
        return this.datePipe.transform(date, this.DATE_FORMAT, this.DATE_TZ);
    }

    /**
     * Sum counts for each file format.
     *
     * @param {FileTypeSummaryResponse[]} fileTypeSummaries
     */
    private buildFileTypeCounts(fileTypeSummaries: FileTypeSummaryResponse[]): Map<string, number> {

        return (fileTypeSummaries || []).reduce((acc, fileTypeSummary) => {

            const count = fileTypeSummary.count || 0;
            const fileType = fileTypeSummary.format;

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
