/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating file-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { EntitySearchResults } from "./entity-search-results.model";
import { FilesDAO } from "./files.dao";
import { FileSummary } from "../file-summary/file-summary";
import { SearchTerm } from "../search/search-term.model";
import { TableParamsModel } from "../table/table-params.model";

@Injectable()
export class FilesService {

    /**
     * @param {FilesDAO} fileDAO
     */
    constructor(private fileDAO: FilesDAO) {
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg specimens, files), as
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

        return this.fileDAO.fetchEntitySearchResults(
            searchTermsBySearchKey, tableParams, selectedEntity, filterableByProject);
    }

    /**
     * Fetch file summary, passing in the current set of search terms.
     *
     * {SearchTerm[]} selectedSearchTerms
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(searchTerms: SearchTerm[]): Observable<FileSummary> {

        return this.fileDAO.fetchFileSummary(searchTerms).pipe(
            map(this.bindFileSummaryResponse)
        );
    }

    /**
     * Create a new file summary object (to trigger change detecting) from the file summary response, and fix erroneous
     * total file size count if applicable.
     *
     * @param {FileSummary} fileSummary
     * @returns {FileSummary}
     */
    private bindFileSummaryResponse(fileSummary: FileSummary): FileSummary {

        const totalFileSize = (typeof fileSummary.totalFileSize === "string") ? 0 : fileSummary.totalFileSize;
        return Object.assign({}, fileSummary, {totalFileSize});
    }
}
