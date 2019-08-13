/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when a project is selected using the "select project" checkboxes on the project tab, or from
 * the project detail page, and uses the project ID as a search key. There is no corresponding facet for project ID (only
 * for project, which uses the project short name - see SelectProjectAction).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileFacetName } from "../../shared/file-facet-name.model";
import { SearchTerm } from "../../search/search-term.model";
import { SearchEntity } from "../../search/search-entity.model";
import { SelectSearchTermAction } from "./select-search-term.action";

export class SelectProjectIdAction implements Action, SelectSearchTermAction {

    public static ACTION_TYPE = "FILE.SEARCH.SELECT_PROJECT_ID";
    public readonly type = SelectProjectIdAction.ACTION_TYPE;

    private readonly facetName = FileFacetName.PROJECT_ID;

    /**
     * @param {string} projectId
     * @param {string} projectShortname
     * @param {boolean} selected
     */
    constructor(
        public readonly projectId: string,
        public readonly projectShortname: string,
        public readonly selected = true) {}

    /**
     * Returns selected project in search term format.
     *
     * @returns {SearchTerm}
     */
    public asSearchTerm(): SearchTerm {

        return new SearchEntity(this.facetName,  this.projectId, this.projectShortname);
    }

    /**
     * There is no corresponding facet for project ID - throw error.
     */
    public getTermKey(): string {

        throw `No facet found for ${this.facetName}`;
    }
}
