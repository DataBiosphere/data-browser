/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Client-side configuration file.
 */
// Core dependencies
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
// App dependencies
import { ConfigDAO } from "./config.dao";
import { Config } from "./config.model";
import { AppState } from "../_ngrx/app.state";
import { FetchConfigRequestSuccessAction } from "./_ngrx/config.actions";

@Injectable()
export class ConfigService {

    // Locals
    private configDAO: ConfigDAO;
    private dataURL: string; // Pulled from config store, saved as local state here on service
    private portalURL: string;
    private store: Store<AppState>;

    /**
     * @param {ConfigDAO} configDAO
     * @param store {Store<AppState>}
     */
    constructor(configDAO: ConfigDAO, store: Store<AppState>) {

        this.configDAO = configDAO;
        this.store = store;
    }

    /**
     * Hit API end point to retrieve configuration information for this Boardwalk instance. Must return promise here
     * as this method is called during Angular's app initialization and we need to resolve the config details (eg
     * data URL) before any components are instantiated. The config details returned from the server are saved on
     * this config service as local state (for easy access from calling classes where we don't want to handle
     * Observables) as well as in the store.
     *
     * Note: if we add a fetch method at a later stage (eg to retrieve updated config), the local data URL value on this
     * service must be updated as well as the value in the store.
     *
     * @returns {Promise<Config>}
     */
    public initConfig(): Promise<Config> {

        let promise = this.configDAO.fetchConfig();
        promise.then((config: Config) => {
            this.storeConfig(config);
        });
        return promise;
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
     * Return the data URL for this Boardwalk instance.
     *
     * @returns {string}
     */
    public getPortalURL(): string {

        return this.portalURL;
    }


    /**
     * Return the full data API URL for this Boardwalk instance.
     *
     * @returns {string}
     */
    public getAPIURL(): string {

        return `${this.dataURL}/api`;
    }

    /**
     * Save the data URL as a local variable on this instance, and update the corresponding config value in the store.
     *
     * @param config {Config}
     */
    private storeConfig(config: Config): void {

        this.dataURL = config.dataURL;
        this.portalURL = config.portalURL;
        this.store.dispatch(new FetchConfigRequestSuccessAction(config));
    }
}
