/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for building entity-related HTTP request values, including API URLs and corresponding parameters. Specific 
 * to version 2.0 where there's a possibility of the next or previous URL specified in the return values from the API,
 * and the URL and params do not require building from the current selected search terms in the store (see
 * EntityRequestService for version 1.0 functionality).
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { EntityRequest } from "./entity-request.model";
import { SearchTerm } from "../search/search-term.model";
import { TableParams } from "../table/pagination/table-params.model";
import { EntityRequestService } from "./entity-request.service";
import { TableParams20 } from "../table/pagination/table-params.2.0.model";

@Injectable()
export class EntityRequestService20 extends EntityRequestService {

    /**
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {TableParams} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {EntityRequest}
     */
    public buildEntityRequest(searchTermsBySearchKey: Map<string, Set<SearchTerm>>,
                              tableParams: TableParams20,
                              selectedEntity: string,
                              filterableByProject = true): EntityRequest {
        
        if ( tableParams.next || tableParams.previous ) {
            return {
                url: tableParams.next || tableParams.previous
            };
        }

        return super.buildEntityRequest(searchTermsBySearchKey, tableParams, selectedEntity, filterableByProject);
    }
}
