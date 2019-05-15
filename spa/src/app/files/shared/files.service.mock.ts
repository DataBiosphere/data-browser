/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock files service used by specs.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

// App dependencies
import { EntitySearchResults } from "./entity-search-results.model";
import { FileSummary } from "../file-summary/file-summary";
import { SearchTerm } from "../search/search-term.model";
import { TableParamsModel } from "../table/table-params.model";
import { DEFAULT_FILE_SUMMARY } from "./file-summary.mock";
import { DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS } from "./entity-search-results.mock";

@Injectable()
export class FilesMockService {

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg samples, files), as
     * well as facet terms and their corresponding counts. See fetchProjectSearchResults for projects tab.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParamsModel} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {Observable<EntitySearchResults>}
     */
    public fetchEntitySearchResults(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                                    tableParams: TableParamsModel,
                                    selectedEntity: string,
                                    filterableByProject = true): Observable<EntitySearchResults> {

        return of(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS);
    }

    /**
     * Fetch file summary, passing in the current set of search terms.
     *
     * {SearchTerm[]} selectedSearchTerms
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(searchTerms: SearchTerm[]): Observable<FileSummary> {

        return of(DEFAULT_FILE_SUMMARY);
    }
}
