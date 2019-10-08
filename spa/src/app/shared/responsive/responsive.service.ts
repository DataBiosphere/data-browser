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
     * @param {Window} window
     */
    constructor(@Inject("Window") private window: Window) {}

    /**
     * Returns true if window width is less than 1200px, which is a HCA-specific breakpoint.
     *
     * @returns {boolean}
     */
    public isWindowWidthHCAMedium(): boolean {

        return this.window.document.body.offsetWidth < 1200;
    }

    /**
     * Returns true if window width is less than 960px, which is a standard Material Design breakpoint (see _cgl.vars
     * for matching responsive value).
     *
     * @returns {boolean}
     */
    public isWindowWidthSmallTablet(): boolean {

        return this.window.document.body.offsetWidth < 960;
    }

    /**
     * Returns true if window width is less than 675px
     *
     * @returns {boolean}
     */
    public isWindowWidthSmall(): boolean {

        return this.window.document.body.offsetWidth < 675;
    }
}
