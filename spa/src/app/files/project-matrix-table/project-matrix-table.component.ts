/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying project matrix files in tabular format.
 */

// Core dependencies
import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { FileLocation } from "../file-location/file-location.model";
import { FileLocationRequestEvent } from "../file-location/file-location-request.event";
import { AppState } from "../../_ngrx/app.state";
import { ClearProjectMatrixArchivePreviewAction } from "../_ngrx/project/clear-project-matrix-archive-preview.action";
import { ArchivePreview } from "../project-matrix/archive-preview.model";
import { ArchivePreviewRequestEvent } from "../project-matrix/archive-preview-request.event";
import { ProjectMatrixTableView } from "./project-matrix-table-view.model";
import { ProjectMatrixView } from "../project-matrix/project-matrix-view.model";
import { GenusSpecies } from "../shared/genus-species.model";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-matrix-table",
    templateUrl: "./project-matrix-table.component.html",
    styleUrls: ["./project-matrix-table.component.scss"]
})
export class ProjectMatrixTableComponent implements OnDestroy {
    
    // Locals
    private ARCHIVE_FILE_TYPE_REGEX = /\.(zip|tar|tar\.gz)$/;

    // Template variables 
    public columnsToDisplay = 
        ["actions", "fileName", "contentDescription", "size", "genusSpecies", "organ", "libraryConstructionApproach"];
    public expandedProjectMatrixView: ProjectMatrixView | undefined | null;

    // Inputs/Outputs
    @Input() project: Project;
    @Input() projectMatrixArchivePreviewsByMatrixId: Map<string, ArchivePreview>;
    @Input() projectMatrixFileLocationsByFileUrl: Map<string, FileLocation> = new Map();
    @Input() projectMatrixViews: ProjectMatrixView[];
    @Output() projectMatrixFileLocationRequested = new EventEmitter<FileLocationRequestEvent>();
    @Output() projectMatrixArchivePreviewRequested = new EventEmitter<ArchivePreviewRequestEvent>();

    /**
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {}

    /**
     * Return the archive preview for the given matrix view.
     * 
     * @param {ProjectMatrixView} projectMatrixView
     * @returns {ArchivePreview}
     */
    getArchivePreview(projectMatrixView: ProjectMatrixView): ArchivePreview {
        
        return this.projectMatrixArchivePreviewsByMatrixId.get(projectMatrixView.id);
    }

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
     * Return content descriptions as a comma-separated string.
     * 
     * @param {string[]} contentDescription
     * @returns {string}
     */
    public listContentDescriptions(contentDescription: string[]): string {

        return contentDescription.join(", ");
    }
    
    /**
     * Returns true if an specified matrix view is an archive.
     * 
     * @param {ProjectMatrixView} projectMatrixView 
     */
    public isArchivePreviewAvailable(projectMatrixView: ProjectMatrixView): boolean {

        return this.ARCHIVE_FILE_TYPE_REGEX.test(projectMatrixView.fileName);
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
     * Toggle selected project matrix view to display archives. If view is already expanded, collapse it. If view
     * is not expanded, dispatch action to request archive preview and expand row.
     * 
     * @param {ProjectMatrixView} projectMatrixView
     */
    public onArchivePreviewRequested(projectMatrixView: ProjectMatrixView) {

        if ( this.expandedProjectMatrixView === projectMatrixView ) {
            this.expandedProjectMatrixView = null;
        }
        else {
            const event = new ArchivePreviewRequestEvent(projectMatrixView.id, projectMatrixView.version);
            this.projectMatrixArchivePreviewRequested.emit(event);
            this.expandedProjectMatrixView = projectMatrixView;
        }
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

    /**
     * Clear archive preview state on destroy.
     */
    public ngOnDestroy() {
        this.store.dispatch(new ClearProjectMatrixArchivePreviewAction(this.project.entryId));
    }
}
