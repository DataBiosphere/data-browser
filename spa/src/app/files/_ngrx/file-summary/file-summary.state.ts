import { FileSummary } from "../../file-summary/file-summary";
import { FetchFileSummarySuccessAction } from "./file-summary.actions";

const DEFAULT_FILE_SUMMARY = {
    fileCount: 0,
    totalFileSize: 0,
    donorCount: 0,
    projectCount: 0,
    primarySiteCount: 0,
    primarySite: 0
};

export class FileSummaryState implements FileSummary {

    fileCount: number;
    totalFileSize: number;
    donorCount: number;
    projectCount: number;
    primarySiteCount: number;
    primarySite: number;

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
