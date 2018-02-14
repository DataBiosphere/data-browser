/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Client-side configuration file.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";

// App dependencies
import { ConfigDAO } from "./config.dao";
import { Config } from "./config.model";
import { selectConfigConfig } from "./_ngrx/config.selectors";
import { AppState } from "../_ngrx/app.state";

@Injectable()
export class ConfigService {
    
    // Locals
    private configDAO: ConfigDAO;
    private dataURL: string; // Pulled from config store, saved as local state here on service

    /**
     * @param {ConfigDAO} configDAO
     * @param store {Store<AppState>}
     */
    constructor(configDAO: ConfigDAO, store: Store<AppState>) {
        
        this.configDAO = configDAO;

        // Maintain subscription to config state, so we can keep a record of the current value of the data URL
        this.getConfig(store)
            .filter((config: Config) => {
                return config.isInitialized();
            })
            .take(1) // Immediately unsubscribe
            .subscribe((config: Config) => {
                this.dataURL = config.dataURL;
                console.log(`Data URL: ${this.dataURL}`);
            });
    }

    /**
     * Hit API end point to retrieve configuration information for this Boardwalk instance.
     *
     * @returns {Observable<Config>}
     */
    public fetchConfig(): Observable<Config> {

        return this.configDAO.fetchConfig();
    }

    /**
     * Return the data URL for this Boardwalk instance.
     * 
     * @returns {string}
     */
    public getDataURL(): string {
        
        return this.dataURL;
    }

    /**
     * Return the full data API URL for this Boardwalk instance.
     * 
     * @returns {string}
     */
    public getApiUrl(): string {

        return `${this.dataURL}/api/v1`;
    }

    /**
     * Returns true if there is a sort order for the data.
     * 
     * @returns {boolean}
     */
    public hasSortOrder(): boolean {

        return false;
    }

    /**
     * Get the current config from the store.
     * 
     * @param store {Store<AppState>}
     * @returns {Observable<Config>}
     */
    private getConfig(store: Store<AppState>): Observable<Config> {
        
        return store.select(selectConfigConfig);
    }
}
