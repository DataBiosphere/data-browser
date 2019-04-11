/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when a project is selected from facet search and uses the project short name as a key.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileFacetName } from "../../shared/file-facet-name.model";
import { SearchTerm } from "../../search/search-term.model";
import { SearchFileFacetTerm } from "../../search/search-file-facet-term.model";
import { SelectSearchTermAction } from "./select-search-term.action";

export class SelectProjectAction implements Action, SelectSearchTermAction {

    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.SELECT_PROJECT";
    public readonly type = SelectProjectAction.ACTION_TYPE;
    public readonly facetName = FileFacetName.PROJECT;

    /**
     * @param {string} projectShortName
     * @param {boolean} selected
     */
    constructor(
        public readonly projectShortName: string,
        public readonly selected = true) {}

    /**
     * Returns selected project in search term format.
     *
     * @returns {SearchTerm}
     */
    public asSearchTerm(): SearchTerm {

        return new SearchFileFacetTerm(this.facetName, this.projectShortName);
    }

    /**
     * Currently, a project is both an entity and is included in the set of facets returned from the server. For
     * consistency, we maintain the selected state of the project terms in the set of facets (along with other selected
     * terms in the set of facets) even though the selected project term state of project facet is never used.
     *
     * When maintaining the selected state of a project term, we use the project short name as a key to identify the
     * project term.
     */
    public getTermKey(): string {

        return this.projectShortName;
    }
}
