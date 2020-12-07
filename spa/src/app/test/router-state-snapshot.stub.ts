/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Stub RouterStateSnapshot object, to be used when spying on snapshot properties. For example,
 *
 * spyOnProperty(routerStateSnapshot, "url").and.returnValue("");
 */

// Core dependencies
import { Injectable } from "@angular/core";

@Injectable()
export class RouterStateSnapshotStub {

    /**
     * @returns {string}
     */
    get url() {
        return "";
    }
}
