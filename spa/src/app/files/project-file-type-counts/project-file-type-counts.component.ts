/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project file type counts.
 */

// Core dependencies
import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { AppState } from "../../_ngrx/app.state";
import { SelectProjectFileFacetTermAction } from "../_ngrx/file-manifest/select-project-file-facet-term.action";
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";

@Component({
    selector: "project-file-type-counts",
    templateUrl: "./project-file-type-counts.component.html",
    styleUrls: ["./project-file-type-counts.component.scss"]
})
export class ProjectFileTypeCountsComponent {

    // Inputs
    @Input() keyValuePairs: KeyValuePair[];

    /**
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {}

    /**
     * Returns true if file type is "Total".
     * 
     * @param {string} fileType
     * @returns {boolean}
     */
    public isFileTypeTotal(fileType: string): boolean {

        return fileType === "Total";
    }

    /**
     * Handle click on file type; update store with selected file type before navigate to bulk download.
     * 
     * @param {string} fileType
     */
    public onFileTypeClicked(fileType: string) {

        // Dispatch event to select file type
        const action = new SelectProjectFileFacetTermAction(
            FileFacetName.FILE_FORMAT,
            fileType,
            null, // Display value only required for project ID facet
            true);
        this.store.dispatch(action);
    }
}
