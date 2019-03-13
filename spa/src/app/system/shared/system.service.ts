/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Service for coordinating system-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// App dependencies
import { SystemDAO } from "./system.dao";
import { HealthResponse } from "./health/health-response.model";

@Injectable()
export class SystemService {

    /**
     * @param {SystemDAO} systemDAO
     */
    constructor(private systemDAO: SystemDAO) {
    }

    /**
     * Fetch the current system status.
     *
     * @returns {Observable<HealthResponse>}
     */
    public healthCheck(): Observable<HealthResponse> {

        return this.systemDAO.healthCheck();
    }
}
