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
     * Return the count.
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
     * Return a unique value to identify this search term by.
     *
     * @returns {string}
     */
    getId(): string {

       return `${this.getSearchKey()}:${this.getSearchValue()}`;
    }

    /**
     * Return the entity name.
     *
     * @returns {string}
     */
    public getName(): string {

        return this.entityName;
    }

    /**
     * The search key of an entity is its entity type name.
     *
     * @returns {string}
     */
    public getSearchKey(): string {

        return this.searchKey;
    }

    /**
     * The search value of an entity is its ID.
     *
     * @returns {string}
     */
    public getSearchValue(): string {

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


