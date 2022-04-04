/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when file facet term is selected during project downloads. Terms can possibly be species,
 * file format, or project if download is project-specific.
 *
 * TODO
 * This action is currently only dispatched during project-related downloads. This can be reused by get data functionality
 * once it is generalised to use download-specific search state rather than app-wide search state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SearchTerm } from "../../search/search-term.model";
import { SearchEntity } from "../../search/search-entity.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";

export class SelectProjectFileFacetTermAction implements Action {
    public static ACTION_TYPE = "FILE_MANIFEST.PROJECT_SELECT_FACET_TERM";
    public readonly type = SelectProjectFileFacetTermAction.ACTION_TYPE;

    /**
     * @param {string} facetName
     * @param {string} termName
     * @param {string | null} displayValue - only specified for project IDs and will always be the project short name
     * @param {boolean} selected
     */
    constructor(
        public readonly facetName: string,
        public readonly termName: string,
        public readonly displayValue: string | null,
        public readonly selected = true
    ) {}

    /**
     * Returns selected file facet term in search term format.
     *
     * @returns {SearchTerm}
     */
    public asSearchTerm(): SearchTerm {
        // Handle selected project IDs
        if (this.facetName === FileFacetName.PROJECT_ID) {
            return new SearchEntity(
                this.facetName,
                this.termName,
                this.displayValue
            );
        }

        // Handle all other facets
        return new SearchFacetTerm(this.facetName, this.termName);
    }
}
