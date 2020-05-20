/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
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
    private dcpHealthCheckUrl: string;
    private matrixURL: string;
    private portalURL: string;
    private deployment: string;
    private projectMetaURL: string;
    private store: Store<AppState>;
    private version: string;

    /**
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {

        this.store = store;
    }

    /**
     * Build full end point URL, from API URL and specified path.
     *
     * @param path
     * @returns {string}
     */
    public buildApiUrl(path: string) {

        const domain = this.getAPIURL();
        return `${domain}${path}`;
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
     * Return the data URL.
     *
     * @returns {string}
     */
    public getDataURL(): string {

        return this.dataURL;
    }

    /**
     * Return the DCP health check path.
     *
     * @returns {string}
     */
    public getDCPHealthCheckURL(): string {

        return this.dcpHealthCheckUrl;
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
     * Returns the complete URL for the meta download for the specified project.
     * 
     * @param {string} projectId
     * @returns {string}
     */
    public getProjectMetaDownloadURL(projectId: string): string {

        return `${this.getProjectMetaURL()}/project-assets/project-metadata/${projectId}.tsv`;
    }

    /**
     * Returns the complete URL for the download of the prepared matrix for the specified project.
     *
     * @param {string} fileName
     * @returns {string}
     */
    public getProjectPreparedMatrixDownloadURL(fileName: string): string {

        return `${this.getProjectMetaURL()}/project-assets/project-matrices/${fileName}`;
    }

    /**
     * Return the full data API URL for this Boardwalk instance.
     *
     * @returns {string}
     */
    public getAPIURL(): string {

        if ( this.dataURL ) {
            return this.dataURL;
        }
        
        return "";
    }

    /**
     * Returns true if the current environment is local.
     *
     * @returns {boolean}
     */
    public isEnvLocal(): boolean {

        return this.deployment === "local";
    }

    /**
     * Returns true if the current environment is ux-dev.
     *
     * @returns {boolean}
     */
    public isEnvUxDev(): boolean {

        return this.deployment === "ux-dev";
    }

    /**
     * Returns true if the current environment is a version 2.0 environment.
     * 
     * @returns {boolean}
     */
    public isV2(): boolean {

        return this.version === "2.0";
    }

    /**
     * Save the data URL as a local variable ogetAPIURLn this instance, and update the corresponding config value in the store.
     *
     * @param config {Config}
     */
    private storeConfig(config: Config): void {

        this.dataURL = config.dataURL;
        this.matrixURL = config.matrixURL;
        this.dcpHealthCheckUrl = config.dcpHealthCheckUrl;
        this.deployment = config.deployment;
        this.portalURL = config.portalURL;
        this.projectMetaURL = config.projectMetaURL;
        this.version = config.version;
        this.store.dispatch(new FetchConfigRequestSuccessAction(config));
    }
}
