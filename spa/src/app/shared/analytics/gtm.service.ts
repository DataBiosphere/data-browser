/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service handling Google Tag Manager-related functionality.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";

// App dependencies
import { GAEvent } from "./ga-event.model";
import { GADimension } from "./ga-dimension.model";

@Injectable()
export class GTMService {

    /**
     * @param {Window} window
     */
    constructor(@Inject("Window") private window: Window) {
    }

    /**
     * Send custom "download" GTM event.
     *
     * @param {GAEvent} gaEvent
     */
    public trackEvent(gaEvent: GAEvent): void {

        if ( !this.isTracking() ) {
            return;
        }
        this.sendToGA(gaEvent);
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
     * Add event to data layer, triggering the configured GTM tag (and in turn sending tracking event to GA). Reset any
     * dimension to undefined, if not specified in the supplied GAEvent.
     *
     * @param {GAEvent} gaEvent
     */
    private sendToGA(gaEvent: GAEvent): void {

        const eventConfig = Object.assign(this.getDefaultDimensions(), {
            event: gaEvent.category,
            eventAction: gaEvent.action,
            eventLabel: gaEvent.label
        }, gaEvent.dimensions);

        this.getDataLayer().push(eventConfig);
    }

    /**
     * Get the default values for every dimension.
     * 
     * @returns {[key: string]: string}
     */
    private getDefaultDimensions(): {[key: string]: string} {

        const defaultDimensions = {};
        for ( let i in GADimension ) {
            defaultDimensions[GADimension[i]] = undefined;
        }
        
        return defaultDimensions;
    }
}
