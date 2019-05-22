/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of file summary state.
 */

// App dependencies
import { FileSummary } from "../../file-summary/file-summary";
import { FetchFileSummarySuccessAction } from "./file-summary.actions";
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
     * File summary has been successfully requested from the server - return updated state.
     *
     * @param {FetchFileSummarySuccessAction} action
     * @returns {FileSummaryState}
     */
    public fetchSummarySuccess(action: FetchFileSummarySuccessAction) {
        return new FileSummaryState(action.fileSummary);
    }

    /**
     * @returns {FileSummaryState}
     */
    public static getDefaultState() {
        return new FileSummaryState();
    }
}
