/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Functionality related to rendering of data tables.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { interval, Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable()
export class TableRendererService {
    /**
     * Simulated calculation of end of change detection.
     *
     * @returns {Observable<boolean>}
     */
    public onRenderCompleted(): Observable<boolean> {
        return interval(0).pipe(
            take(1),
            map(() => true)
        );
    }
}
