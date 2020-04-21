/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Browser supported guard.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";

@Injectable()
export class BrowserSupportedGuard implements CanActivate {

    /**
     * @param {DeviceDetectorService} deviceService
     */
    constructor(private deviceService: DeviceDetectorService) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        return this.isBrowserSupported();
    }

    /**
     * Returns true if browser is supported.
     *
     * @returns {boolean}
     */
    private isBrowserSupported(): boolean {

        // Display browser not supported for Internet Explorer.
        if ( this.deviceService.browser === "IE" ) {

            window.location.href = "/static/browser-not-supported.html";
            return false;
        }

        return true;
    }
}
