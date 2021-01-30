/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying project matrix files in tabular format.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { FileLocation } from "../file-location/file-location.model";
import { FileLocationRequestEvent } from "../file-location/file-location-request.event";
import { AppState } from "../../_ngrx/app.state";
import { ProjectMatrixTableView } from "./project-matrix-table-view.model";
import { ProjectMatrixView } from "../project-matrix/project-matrix-view.model";
import { GenusSpecies } from "../shared/genus-species.model";

@Component({
    selector: "project-matrix-table",
    templateUrl: "./project-matrix-table.component.html",
    styleUrls: ["./project-matrix-table.component.scss"]
})
export class ProjectMatrixTableComponent {

    // Template variables 
    public columnsToDisplay = ["actions", "fileName", "genusSpecies", "organ", "libraryConstructionApproach"];

    // Inputs/Outputs
    @Input() projectMatrixFileLocationsByFileUrl: Map<string, FileLocation> = new Map();
    @Input() projectMatrixViews: ProjectMatrixView[];
    @Output() projectMatrixFileLocationRequested = new EventEmitter<FileLocationRequestEvent>();

    /**
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {}

    /**
     * Return the file location for the specified file, or return a not started status if not yet requested file
     * location has not yet been requested.
     *
     * @param {string} fileUrl
     * @returns {FileLocation}
     */
    public getFileLocationByFileUrl(fileUrl: string): FileLocation {

        return this.projectMatrixFileLocationsByFileUrl.get(fileUrl);
    }

    /**
     * Return the display text for the specified set of species.
     *
     * @param {GenusSpecies[]} species
     * @returns {string}
     */
    public getSpeciesDisplayText(species: GenusSpecies[]): string {

        return species.join(", ");
    }

    /**
     * Group the project matrix views by species. If project matrix views has multiple species, they are grouped by the
     * union of all species defined for the view.
     *
     * @param {ProjectMatrixView[]} projectMatrixViews
     * @returns {ProjectMatrixTableView}
     */
    public groupProjectMatrixViewsBySpecies(projectMatrixViews: ProjectMatrixView[]): ProjectMatrixTableView[] {

        const viewsBySpecies = projectMatrixViews.reduce((accum, projectMatrixView) => {

            const species = projectMatrixView[FileFacetName.GENUS_SPECIES];
            const speciesKey = species.join(" ");
            if ( !accum.has(speciesKey) ) {
                accum.set(speciesKey, {
                    species,
                    projectMatrixViews: []
                });
            }
            accum.get(speciesKey).projectMatrixViews.push(projectMatrixView);

            return accum;
        }, new Map<string, ProjectMatrixTableView>());

        const groupedViews = Array.from(viewsBySpecies.values());
        this.sortProjectMatrixTableViews(groupedViews);
        return groupedViews;
    }

    /**
     * Initiate request for file location of specified file.
     *
     * @param {FileLocationRequestEvent} fileLocationRequestEvent
     */
    public onFileLocationRequested(fileLocationRequestEvent: FileLocationRequestEvent) {

        this.projectMatrixFileLocationRequested.emit(fileLocationRequestEvent);
    }

    /**
     * Sort matrix view groups first by species cardinality, then by species alpha.
     */
    private sortProjectMatrixTableViews(views: ProjectMatrixTableView[]) {

        views.sort((group0, group1) => {

            const speciesCount0 = group0.species.length;
            const speciesCount1 = group1.species.length;

            if ( speciesCount0 > speciesCount1 ) {
                return 1;
            }
            else if ( speciesCount0 < speciesCount1 ) {
                return -1;
            }

            return 0;
        });
    }

    /**
     * Return the value to track project matrix views.
     *
     * @param {number} index
     * @param {ProjectMatrixView} projectMatrixView
     * @returns {string}
     */
    public trackProjectMatrixViews(index: number, projectMatrixView: ProjectMatrixView): string {

        return projectMatrixView.url;
    }

    /**
     * Return the value to track table views.
     *
     * @param {number} index
     * @param {ProjectMatrixTableView} projectMatrixTableView
     * @returns {string}
     */
    public trackProjectMatrixTableView(index: number, projectMatrixTableView: ProjectMatrixTableView): string {

        return projectMatrixTableView.species.join("");
    }
}
