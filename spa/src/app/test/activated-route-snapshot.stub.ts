/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Stub ActivatedRouteSnapshot object, to be used when spying on snapshot properties. For example,
 *
 * spyOnProperty(activatedRoute, "queryParams").and.returnValue({});
 */

// Core dependencies
import { Injectable } from "@angular/core";

@Injectable()
export class ActivatedRouteSnapshotStub {

    /**
     * @returns {{}}
     */
    get queryParams() {
        return {};
    }

    /**
     * @returns {{}}
     */
    get url() {
        return {};
    }
}
