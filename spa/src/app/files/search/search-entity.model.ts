/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of selectable entity (eg project).
 */

// App dependencies
import { SearchTerm } from "./search-term.model";

export class SearchEntity implements SearchTerm {

    /**
     * @param {string} searchKey
     * @param {string} entityId
     * @param {string} entityName
     * @param {number} count - only required when setting up search terms for select from search box (and not when actually selecting an entity)
     */
    constructor(
        private readonly searchKey: string, // "projectId"
        private readonly entityId: string, // "123abc...456def"
        private readonly entityName: string, // "1M Neuron"
        private readonly count?: number) {}

    /**
     * Return the count. Only required when setting up search terms options for select from search box (and not when
     * when setting up search terms from selected facets.
     *
     * @returns {number}
     */
    public getCount(): number {

        return this.count;
    }

    /**
     * The display value of an entity search term is the entity name.
     *
     * @returns {string}
     */
    public getDisplayValue(): string {

        return this.entityName;
    }

    /**
     * Return a unique value to identify this search term by - convenience method, used when iterating through sets of
     * search terms that are grouped by facet name or entity name.
     *
     * @returns {string}
     */
    getId(): string {

       return `${this.getSearchKey()}:${this.getSearchValue()}`;
    }

    /**
     * The search key of an entity is its entity type name. This value is used when building the filter query string
     * parameter.
     *
     * @returns {string}
     */
    public getSearchKey(): string {

        return this.searchKey;
    }

    /**
     * The search value of an entity is its ID. This value is used internally to check equality, as well as when
     * updating the filter query string parameter on facet selection.
     *
     * @returns {string}
     */
    public getSearchValue(): any {

        return this.entityId;
    }

    /**
     * Use the entity ID as the filter query string parameter. This value is not used when updating the location
     * according to the set of selected facets. The location is updated with the front-end representation of the
     * selected set of facets whereas this method translates the front-end representation when facets are marshalled
     * for request functionality.
     *
     * @returns {any}
     */
    public getFilterParameterValue(): any {

        return this.entityId;
    }

    /**
     * The sort value of a search entity is its display value;
     *
     * @returns {string}
     */
    public getSortValue(): string {

        return this.getDisplayValue();
    }
}


