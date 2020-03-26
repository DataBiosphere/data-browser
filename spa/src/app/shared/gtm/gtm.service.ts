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

    private EVENT_NAME_DOWNLOAD = "download";
    private EVENT_NAME_EXTERNAL_LINK = "externalLink";
    
    private dataLayer;

    /**
     * @param {Window} window
     */
    constructor(@Inject("Window") private window: Window) {

        this.dataLayer = window["dataLayer"];
    }

    /**
     * Send custom "download" GTM event.
     * 
     * @param {string} url
     */
    public trackDownload(url: string): void {

        if ( !this.isTracking() ) {
            return;
        }
        this.trackEvent(this.EVENT_NAME_DOWNLOAD, {url});
    }

    /**
     * Send custom "download" GTM event.
     *
     * @param {string} url
     */
    public trackExternalLink(url: string): void {

        if ( !this.isTracking() ) {
            return;
        }
        this.trackEvent(this.EVENT_NAME_EXTERNAL_LINK, {url});
    }
    
    /**
     * Returns true if GTM is enabled.
     * 
     * @returns {boolean}
     */
    private isTracking(): boolean {

        return !!this.dataLayer;
    }

    /**
     * Track the specified event.
     * 
     * @param {string} eventName
     * @param {any} eventVariables
     */
    private trackEvent(eventName: string, eventVariables: any): void {

        this.dataLayer.push(Object.assign({
            "event": eventName
        }, eventVariables));
    }
}
