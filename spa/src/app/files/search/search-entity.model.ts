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
     * @param {string} facetName
     * @param {string} id
     * @param {string} name
     */
    constructor(public readonly facetName: string, public readonly id: string, public readonly name: string) {}

    /**
     * The key of an entity is its ID.
     *
     * It is currently possible to have no ID for an entity (for example, when selecting a project from the search box).
     * In this case, return the entity name. Once entities are removed from the search box, the only valid search key
     * for an entity is its ID.
     *
     * @returns {string}
     */
    public getSearchKey(): string {

        return this.id || this.name;
    }
}


