/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when file facet term is selected. Select can be dispatched from facet card itself or from
 * corresponding term menu displayed over facet card (this includes search facets and their menus).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SearchTerm } from "../../search/search-term.model";
import { SelectSearchTermAction } from "./select-search-term.action";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GASource } from "../../../shared/analytics/ga-source.model";

export class SelectFileFacetTermAction implements Action, SelectSearchTermAction, TrackingAction {

    public static ACTION_TYPE = "FILE.SEARCH.SELECT_FACET_TERM";
    public readonly type = SelectFileFacetTermAction.ACTION_TYPE;

    /**
     * @param {string} facetName
     * @param {string} termName
     * @param {boolean} selected
     * @param {GASource} source
     */
    constructor(public readonly facetName: string,
                public readonly termName: string,
                public readonly selected = true,
                public source: GASource) {}

    /**
     * Return the selected age range as a GA event.
     *
     * @param {string} currentQuery
     * @returns {GAEvent}
     */
    public asEvent(currentQuery: string): GAEvent {
        
        return {
            category: GACategory.SEARCH,
            action: this.selected ? GAAction.SELECT : GAAction.DESELECT,
            label: this.termName,
            dimensions: {
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.ENTITY_TYPE]: GAEntityType.FACET,
                [GADimension.FACET]: this.facetName,
                [GADimension.SOURCE]: this.source,
                [GADimension.TERM]: this.termName
            }
        };
    }

    /**
     * Returns selected file facet term in search term format.
     *
     * @returns {SearchTerm}
     */
    public asSearchTerm(): SearchTerm {

        return new SearchFacetTerm(this.facetName, this.termName);
    }

    /**
     * They key of a facet file term is its name.
     */
    public getTermKey(): string {

        return this.termName;
    }
}
