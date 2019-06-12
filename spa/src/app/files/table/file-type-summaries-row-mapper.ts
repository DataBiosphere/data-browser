/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Class responsible for mapping response returned from entity end points, that contain file type summaries. Specifically,
 * samples and projects.
 */

// App dependencies
import { EntityRowMapper } from "./entity-row-mapper";
import { getFileCountDisplay, getFileTypeCounts } from "./table-methods";
import { EntityRow } from "./entity-row.model";

export class FileTypeSummariesRowMapper extends EntityRowMapper {
    
    private fileTypeCounts;

    /**
     * @param {any} row - data modelling row in current selected table.
     */
    constructor(row: any) {
        
        super(row);
        
        // Protect against a null file type summaries value here by defaulting to empty array. This would only occur
        // in an error / bad data case.
        this.fileTypeCounts = getFileTypeCounts(row.fileTypeSummaries || []);
    }

    /**
     * Return the version of the row, optimized for display in the data table.
     */
    public mapRow(): EntityRow {

        return Object.assign({}, super.mapRow(), {
            bamCount: getFileCountDisplay(this.fileTypeCounts.bamCount),
            matrixCount: getFileCountDisplay(this.fileTypeCounts.matrixCount),
            otherCount: getFileCountDisplay(this.fileTypeCounts.otherCount),
            rawCount: getFileCountDisplay(this.fileTypeCounts.rawCount),
            totalCount: getFileCountDisplay(this.fileTypeCounts.totalCount)
        });
    }
}
