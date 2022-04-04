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
import { TrackingAction } from "../analytics/tracking.action";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { SearchTerm } from "../../search/search-term.model";
import { SearchEntity } from "../../search/search-entity.model";
import { SelectSearchTermAction } from "./select-search-term.action";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GASource } from "../../../shared/analytics/ga-source.model";

export class SelectProjectIdAction
    implements Action, SelectSearchTermAction, TrackingAction
{
    public static ACTION_TYPE = "FILE.SEARCH.SELECT_PROJECT_ID";
    public readonly type = SelectProjectIdAction.ACTION_TYPE;

    private readonly facetName = FileFacetName.PROJECT_ID;

    /**
     * @param {string} projectId
     * @param {string} projectShortname
     * @param {boolean} selected
     * @param {GASource} source
     */
    constructor(
        public readonly projectId: string,
        public readonly projectShortname: string,
        public readonly selected = true,
        public readonly source: GASource
    ) {}

    /**
     * Return the cleared age range action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({ catalog, currentQuery }): GAEvent {
        return {
            category: GACategory.SEARCH,
            action: this.selected ? GAAction.SELECT : GAAction.DESELECT,
            label: this.projectShortname,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.ENTITY_ID]: this.projectId,
                [GADimension.ENTITY_TYPE]: GAEntityType.FACET,
                [GADimension.FACET]: this.facetName,
                [GADimension.SOURCE]: this.source,
                [GADimension.TERM]: this.projectShortname,
            },
        };
    }

    /**
     * Returns selected project in search term format.
     *
     * @returns {SearchTerm}
     */
    public asSearchTerm(): SearchTerm {
        return new SearchEntity(
            this.facetName,
            this.projectId,
            this.projectShortname
        );
    }

    /**
     * There is no corresponding facet for project ID - throw error.
     */
    public getTermKey(): string {
        throw `No term key for ${this.facetName}`;
    }
}
