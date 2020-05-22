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

@Injectable()
export class SystemService extends AbstractSystemService {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(protected configService: ConfigService, protected httpClient: HttpClient) {

        super(configService, httpClient);
    }

    /**
     * Fetch the current system status; both the DCP-wide status and the current (Azul) indexing status.
     */
    public fetchSystemStatus(): Observable<SystemStatusResponse> {

        return forkJoin({health: this.checkHealth(), index: this.checkIndexStatus()})
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
