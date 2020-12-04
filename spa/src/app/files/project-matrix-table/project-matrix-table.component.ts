/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying project matrix files in tabular format.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { ProjectMatrixTableView } from "./project-matrix-table-view.model";
import { ProjectMatrixView } from "../project-matrix/project-matrix-view.model";
import { FileDownloadLink } from "../../shared/file-download/file-download.model";
import { GenusSpecies } from "../shared/genus-species.model";

@Component({
    selector: "project-matrix-table",
    templateUrl: "./project-matrix-table.component.html",
    styleUrls: ["./project-matrix-table.component.scss"]
})
export class ProjectMatrixTableComponent {

    // Template variables 
    public columnsToDisplay = ["fileName", "genusSpecies", "organ", "libraryConstructionApproach", "actions"];
    
    // Inputs
    @Input() projectMatrixViews: ProjectMatrixView[];

    /**
     * Return the file download spec for the specified matrix file - this is used by the FileDownload component to 
     * display/handle download and copy to clipboard functionality.
     * 
     * @param {ProjectMatrixView} projectMatrixView
     */
    public getFileDownloadLink(projectMatrixView: ProjectMatrixView): FileDownloadLink {

        return {
            url: projectMatrixView.url
        };
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
}
