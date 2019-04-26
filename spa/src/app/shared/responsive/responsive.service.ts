/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service handling device and responsive-related functionality.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class ResponsiveService {

    /**
     * @param {DeviceDetectorService} deviceService
     * @param {Store<AppState>} store
     * @param {Window} window
     */
    constructor(@Inject("Window") private window: Window) {}

    /**
     * Returns true if window width is less than 1200px
     *
     * @returns {boolean}
     */
    public isWindowWidthMedium(): boolean {

        return window.document.body.offsetWidth < 1200;
    }

    /**
     * Returns true if window width is less than 675px
     * 
     * @returns {boolean}
     */
    public isWindowWidthSmall(): boolean {

        return window.document.body.offsetWidth < 675;
    }
}
