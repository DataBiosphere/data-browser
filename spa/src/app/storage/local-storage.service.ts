/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service handling local storage-related functionality.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

    private storage: Storage;

    /**
     * @param {Window} window
     */
    constructor(@Inject("Window") private window: Window) {
        this.storage = window.localStorage;
    }

    /**
     * Return the value for the specified key.
     *
     * @param {string} key
     * @returns {string}
     */
    public get(key: string): string {
        return this.storage.getItem(key);
    }

    /**
     * Set the value for the specified key.
     *
     * @param {string} key
     * @param {string} value
     */
    public set(key: string, value: string) {
        this.storage.setItem(key, value);
    }

    /**
     * Delete the specified key.
     *
     * @param {string} key
     */
    public remove(key: string) {
        this.storage.removeItem(key);
    }

    /**
     * Clear all values from the storage.
     */
    public clear() {
        this.storage.clear();
    }
}
