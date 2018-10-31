/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Representation of file summary state.
 */

// App dependencies
import { FileSummary } from "../../file-summary/file-summary";
import { FetchFileSummarySuccessAction, FetchUnfacetedFileSummarySuccessAction } from "./file-summary.actions";
import { FileTypeSummary } from "../../file-summary/file-type-summary";

// Default file summary
const DEFAULT_FILE_SUMMARY = {
    donorCount: 0,
    fileCount: 0,
    fileTypeSummaries: [],
    organCount: 0,
    projectCount: 0,
    specimenCount: 0,
    totalCellCount: 0,
    totalFileSize: 0
};

export class FileSummaryState implements FileSummary {

    donorCount: number;
    fileCount: number;
    fileTypeSummaries: FileTypeSummary[];
    organCount: number;
    projectCount: number;
    specimenCount: number;
    totalCellCount: number;
    totalFileSize: number;

    constructor(fileSummary: FileSummary = DEFAULT_FILE_SUMMARY) {

        Object.assign(this, fileSummary);
    }

    /**
     * @returns {FileSummaryState}
     */
    public fetchSummaryRequest() {
        return this;
    }

    /**
     * @param {FetchFileSummarySuccessAction} action
     * @returns {FileSummaryState}
     */
    public fetchSummarySuccess(action: FetchFileSummarySuccessAction | FetchUnfacetedFileSummarySuccessAction) {
        return new FileSummaryState(action.fileSummary);
    }

    /**
     * @returns {FileSummaryState}
     */
    public static getDefaultState() {
        return new FileSummaryState();
    }
}
