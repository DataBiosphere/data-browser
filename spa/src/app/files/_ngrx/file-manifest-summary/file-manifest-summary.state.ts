import { FileManifestSummary } from "../../file-manifest-summary/file-manifest-summary";
import { Dictionary } from "app/dictionary";
import { FetchFileManifestSummarySuccessAction } from "./file-manifest-summary.actions";

export class FileManifestSummaryState {

    repoNames: string[];
    repositories: Dictionary<FileManifestSummary>;

    // TODO - the type is wrong on FileManifestSummary. It doesn't have repoName from the API
    constructor(fileManifestSummary: Dictionary<FileManifestSummary> = {}) {

        this.repoNames = Object.keys(fileManifestSummary);
        this.repoNames.forEach((name: string) => {
            fileManifestSummary[name].repoName = name;
        });
        this.repositories = fileManifestSummary;
    }

    requestManifestSummary() {
        return this;
    }

    receiveManifestSummary(action: FetchFileManifestSummarySuccessAction) {
        return new FileManifestSummaryState(action.fileManifestSummary);
    }

    public static getDefaultState() {
        return new FileManifestSummaryState();
    }
}
