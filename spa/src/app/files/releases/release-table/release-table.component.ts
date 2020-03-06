/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Release component for displaying release table.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { Store } from "@ngrx/store";
import { AppState } from "../../../_ngrx/app.state";
import { SetReleaseReferrerAction } from "../../_ngrx/release/set-release-referrer.action";
import { ReleaseOrganView } from "../release-organ-view.model";
import { SetReleaseFilesReferrerAction } from "../../_ngrx/release/set-release-files-referrer.action";

@Component({
    selector: "release-table",
    templateUrl: "./release-table.component.html",
    styleUrls: ["./release-table.component.scss"]
})
export class ReleaseTableComponent {

    // Inputs
    @Input() columnsToDisplay: string[];
    @Input() releaseOrganViews: ReleaseOrganView[];
    @Input() releaseReferrer: boolean;
    @Input() releaseFilesReferrer: boolean[];

    /**
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {}

    /**
     * Returns the technology, based off libraryConstructionApproach. Any libraryConstructionApproach ending with
     * "sequencing" shall have this removed to provide a shortened name for the technology column.
     *
     * @param {string} libraryConstructionApproach
     * @returns {string}
     */
    public renderTechnologyShortName(libraryConstructionApproach: string): string {

        let techShortName = libraryConstructionApproach;

        let techShortNames = techShortName.split(",");

        if ( techShortNames.length > 0 ) {

            techShortName = techShortNames.map(shortName => {

                return shortName.replace("sequencing", "").trim();
            }).join(", ");
        }

        return techShortName;
    }

    /**
     * Update state to indicate that the release files modal should return to the release page and not a project-specific
     * release tab.
     */
    public setReleaseFilesReferrer() {

        if ( this.releaseFilesReferrer ) {
            this.store.dispatch(new SetReleaseFilesReferrerAction());
        }
    }
    
    /**
     * Update state to indicate that the back button the project detail page should navigate back to the release page,
     * and not the project tab.
     */
    public setReleaseReferrer() {

        if ( this.releaseReferrer ) {
            this.store.dispatch(new SetReleaseReferrerAction());
        }
    }
}
