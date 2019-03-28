/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Client-side configuration file.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { Config } from "./config.model";
import { environment } from "../../environments/environment";
import { AppState } from "../_ngrx/app.state";
import { FetchConfigRequestSuccessAction } from "./_ngrx/config.actions";

@Injectable()
export class ConfigService {

    // Locals
    private dataURL: string; // Pulled from config store, saved as local state here on service
    private matrixURL: string;
    private portalURL: string;
    private projectMetaURL: string;
    private store: Store<AppState>;

    /**
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {

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

        this.storeConfig(environment as Config);
        return Promise.resolve(environment as Config);
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
     * Returns the matrix URL.
     *
     * @returns {string}
     */
    public getMatrixURL(): string {

        return this.matrixURL;
    }

    /**
     * Returns the portal URL.
     *
     * @returns {string}
     */
    public getPortalURL(): string {

        return this.portalURL;
    }

    /**
     * Returns the project meta URL.
     *
     * @returns {string}
     */
    public getProjectMetaURL(): string {

        return this.projectMetaURL;
    }

    /**
     * Return the full data API URL for this Boardwalk instance.
     *
     * @returns {string}
     */
    public getAPIURL(): string {

        return `${this.dataURL}`;
    }

    /**
     * Save the data URL as a local variable ogetAPIURLn this instance, and update the corresponding config value in the store.
     *
     * @param config {Config}
     */
    private storeConfig(config: Config): void {

        this.dataURL = config.dataURL;
        this.matrixURL = config.matrixURL;
        this.portalURL = config.portalURL;
        this.projectMetaURL = config.projectMetaURL;
        this.store.dispatch(new FetchConfigRequestSuccessAction(config));
    }
}
