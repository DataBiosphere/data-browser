/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service handling Google Tag Manager-related functionality.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";

// App dependencies
import { GACategory } from "./ga-category.model";
import { GAAction } from "./ga-action.model";

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
     * @param {GACategory} category
     * @param {GAAction} action
     * @param {string} label
     * @param {{}} dimensions
     */
    public trackEvent(category: GACategory, action: GAAction, label: string, dimensions: {} = {}): void {

        if ( !this.isTracking() ) {
            return;
        }
        this.sendToGA(category, action, label, dimensions);
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
     * Add event to data layer, triggering the configured GTM tag (and in turn sending tracking event to GA).
     * 
     * @param {GACategory} category - GTM "event" variable, used as "Category" value for GA
     * @param {GAAction} action - used as "Action" value for GA
     * @param {string} label - used as "Label" value for GA
     * @param {{}} dimensions - additional variables that correspond to GTM variables and in turn, GA dimensions
     */
    private sendToGA(category: GACategory, action: GAAction, label: string, dimensions: {} = {}): void {

        const eventConfig = Object.assign({
            event: category,
            eventAction: action,
            eventLabel: label
        }, dimensions);
        this.getDataLayer().push(eventConfig);
    }
}
