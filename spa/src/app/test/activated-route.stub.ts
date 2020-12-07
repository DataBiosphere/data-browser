/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Stub ActivatedRoute object, to be used when spying on snapshot properties. For example,
 * 
 * spyOnProperty(activatedRoute, "snapshot").and.returnValue({
 *    queryParams: {}
 * });
 * 
 * 
 */

// Core dependencies
import { Injectable } from "@angular/core";

@Injectable()
export class ActivatedRouteStub {

    /**
     * @returns {{}}
     */
    get snapshot() {
        return {};
    }
}
