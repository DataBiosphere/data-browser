/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating system-related functionality, specific to v2.0 environment.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

// App dependencies
import { AbstractSystemService } from "./abstract.system.service";
import { ConfigService } from "../../config/config.service";
import { SystemStatusResponse } from "./system-status-response.model";
import { Catalog } from "../../files/catalog/catalog.model";
import { HttpService } from "../../files/http/http.service";

@Injectable()
export class SystemService20 extends AbstractSystemService {

    /**
     * @param {ConfigService} configService
     * @param {HttpService} httpService
     * @param {HttpClient} httpClient
     */
    constructor(protected configService: ConfigService,
                protected httpService: HttpService,
                protected httpClient: HttpClient) {

        super(configService, httpService, httpClient);
    }

    /**
     * Fetch the current system status; uses Azul API to determine overall system status as well as indexing status.
     * 
     * @param {Catalog} catalog
     */
    public fetchSystemStatus(catalog: Catalog): Observable<SystemStatusResponse> {
        
        return this.checkIndexStatus(catalog).pipe(
            switchMap(indexResponse => {
                return of({
                    ok: indexResponse.ok,
                    indexing: indexResponse.indexing,
                    indexingStatus: indexResponse.status
                });
            })
        )
    }

}
