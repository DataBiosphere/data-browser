/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating system-related functionality specific to prev v2.0 environments.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

// App dependencies
import { AbstractSystemService } from "./abstract.system.service";
import { ConfigService } from "../../config/config.service";
import { SystemStatusResponse } from "./system-status-response.model";
import { Catalog } from "../../files/catalog/catalog.model";
import { HttpService } from "../../files/http/http.service";

@Injectable()
export class SystemService extends AbstractSystemService {

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
     * Fetch the current system status; both the DCP-wide status and the current (Azul) indexing status.
     * 
     * @param {Catalog} catalog
     */
    public fetchSystemStatus(catalog: Catalog): Observable<SystemStatusResponse> {

        return forkJoin({health: this.checkHealth(catalog), index: this.checkIndexStatus(catalog)})
            .pipe(
                switchMap(({health, index}) => {
                    return of({
                        ok: health.ok,
                        indexing: index.indexing,
                        indexingStatus: index.status
                    });
                })
            );
    }
}
