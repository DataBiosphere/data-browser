/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating release-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

// App dependencies
import { Release } from "../releases/2020-march/release";
import release2020March from "../releases/2020-march/2020-03-release.json";

@Injectable()
export class ReleaseService {

    /**
     * Fetch the data for the March 2020 release.
     *
     * @returns {Observable<Portal[]>}
     */
    public fetch2020MarchRelease(): Observable<Release> {
        
        return of(release2020March as Release);
    }
}
