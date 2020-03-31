/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service handling Google Tag Manager-related functionality.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class GTMService {

    private EVENT_NAME_DOWNLOAD = "Download";
    private EVENT_NAME_VISUALIZE = "Visualize";

    /**
     * @param {Window} window
     */
    constructor(@Inject("Window") private window: Window) {
    }

    /**
     * Send custom "download" GTM event.
     *
     * @param {string} action
     * @param {string} label
     */
    public trackDownload(action: string, label: string): void {

        if ( !this.isTracking() ) {
            return;
        }
        this.trackEvent(this.EVENT_NAME_DOWNLOAD, action, label);
    }

    /**
     * Send custom "download" GTM event.
     *
     * @param {string} action
     * @param {string} label
     */
    public trackExternalLink(action: string, label: string): void {

        if ( !this.isTracking() ) {
            return;
        }
        this.trackEvent(this.EVENT_NAME_VISUALIZE, action, label);
    }

    /**
     * Return the GTM data layer.
     */
    private getDataLayer(): any[] {

        return this.window["dataLayer"];
    }

    /**
     * Returns true if GTM is enabled.
     * 
     * @returns {boolean}
     */
    private isTracking(): boolean {

        return !!this.getDataLayer();
    }

    /**
     * Track the specified event.
     * 
     * @param {string} eventName
     * @param {string} label
     */
    private trackEvent(eventName: string, action: string, label: string): void {

        const eventConfig = {
            event: eventName,
            eventAction: action,
            eventLabel: label
        };
        this.getDataLayer().push(eventConfig);
    }
}
