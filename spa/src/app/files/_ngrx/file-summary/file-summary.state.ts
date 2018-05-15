import { FileSummary } from "../../file-summary/file-summary";
import { FetchFileSummarySuccessAction } from "./file-summary.actions";

const DEFAULT_FILE_SUMMARY = {
    biomaterialCount: 0, /* HCA Specific */
    bodyPartsCounts: 0,
    fileCount: 0,
    totalFileSize: 0,
    donorCount: 0,
    organCounts: 0, /* HCA Specific */
    primarySite: 0,
    primarySiteCount: 0,
    projectCount: 0,
    sampleCount: 0
};

export class FileSummaryState implements FileSummary {

    biomaterialCount: number; /* HCA Specific */
    bodyPartsCounts: number;
    donorCount: number;
    fileCount: number;
    totalFileSize: number;
    organCounts: number; /* HCA Specific */
    primarySite: number;
    primarySiteCount: number;
    projectCount: number;
    sampleCount: number;

    constructor(fileSummary: FileSummary = DEFAULT_FILE_SUMMARY) {

        Object.assign(this, fileSummary);
    }

    fetchSummaryRequest() {
        return this;
    }

    fetchSummarySuccess(action: FetchFileSummarySuccessAction) {
        return new FileSummaryState(action.fileSummary);
    }

    public static getDefaultState() {
        return new FileSummaryState();
    }
}
