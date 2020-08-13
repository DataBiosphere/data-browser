/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when current set of selected facet terms, as well as the corresponding tab (entity) are to be
 * stored. Currently, this action is dispatched on app init when app state is read from URL params.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Catalog } from "../../catalog/catalog.model";
import { QueryStringSearchTerm } from "../../search/url/query-string-search-term.model";

export class SetViewStateAction implements Action {
    
    public static ACTION_TYPE = "FILE.FACET.SET_VIEW_STATE";
    public readonly type = SetViewStateAction.ACTION_TYPE;

    /**
     * @param {Catalog} catalog
     * @param {string} selectedEntity
     * @param {QueryStringSearchTerm[]} selectedSearchTerms
     */
    constructor(public catalog: Catalog, public selectedEntity: string, public selectedSearchTerms: QueryStringSearchTerm[]) {}
}
