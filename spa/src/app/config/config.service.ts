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
import { APIEndpoints } from "./api-endpoints.model";
import { Config } from "./config.model";
import { environment } from "../../environments/environment";
import { Catalog } from "../files/catalog/catalog.model";
import { AppState } from "../_ngrx/app.state";
import { FetchConfigRequestSuccessAction } from "./_ngrx/config.actions";

@Injectable()
export class ConfigService {
    
    public readonly VERSION_2_0 = "2.0";

    // Locals
    protected atlas: string;
    protected dataURL: string; // Pulled from config store, saved as local state here on service
    protected dcpHealthCheckUrl: string;
    protected matrixURL: string;
    protected portalURL: string;
    protected deployment: string;
    protected projectMetaURL: string;
    protected terraExportURL: string;
    protected store: Store<AppState>;
    protected version: string;
    protected zendeskURL: string;

    /**
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {

        this.store = store;
    }

    /**
     * Returns the atlas for the current environment.
     * 
     * @returns {string}
     */
    public getAtlas(): string {
        
        return this.atlas;
    }

    /**
     * Returns the URL for the catalogs endpoint.
     *
     * @returns {string}
     */
    public getCatalogsUrl(): string {

        const pathBase = this.getIndexBasePath();
        return `${this.dataURL}${pathBase}${APIEndpoints.CATALOGS}`;
    }

    /**
     * Returns the URL for an entities end point (projects, files, samples).
     * 
     * @param {string} entityName
     * @returns {string}
     */
    public getEntitiesUrl(entityName: string): string {

        const pathBase = this.getIndexBasePath();
        return `${this.dataURL}${pathBase}/${entityName}`;
    }

    /**
     * Returns the URL for the integrations end point.
     *
     * @returns {string}
     */
    public getFileManifestUrl(): string {

        const fileManifestSummaryPath = APIEndpoints.FILE_MANIFEST_SUMMARY;
        return `${this.dataURL}${fileManifestSummaryPath}`;
    }

    /**
     * Returns the URL for checking the system status and indexing status of Azul.
     * 
     * @returns {string}
     */
    public getIndexStatusUrl(): string {
        
        return `${this.dataURL}${APIEndpoints.INDEX_STATUS}`;
    }

    /**
     * Returns the URL for the integrations end point.
     *
     * @returns {string}
     */
    public getIntegrationsUrl(): string {

        const integrationsPath = APIEndpoints.INTEGRATIONS;
        return `${this.dataURL}${integrationsPath}`;
    }

    /**
     * Return the data URL.
     *
     * @returns {string}
     */
    public getDataUrl(): string {

        return this.dataURL;
    }

    /**
     * Return the DCP health check path.
     *
     * @returns {string}
     */
    public getDCPHealthCheckUrl(): string {

        return this.dcpHealthCheckUrl;
    }

    /**
     * Returns the matrix URL.
     *
     * @returns {string}
     */
    public getMatrixUrl(): string {

        return this.matrixURL;
    }

    /**
     * Returns the matrix formats URL.
     *
     * @returns {string}
     */
    public getMatrixFormatsUrl(): string {

        return `${this.matrixURL}${APIEndpoints.MATRIX_FORMATS}`;
    }

    /**
     * Returns the matrix request URL.
     *
     * @param {string} requestId
     * @returns {string}
     */
    public getMatrixRequestUrl(requestId: string): string {

        return `${this.matrixURL}/${requestId}`;
    }

    /**
     * Returns the portal URL.
     *
     * @returns {string}
     */
    public getPortalUrl(): string {

        return this.portalURL;
    }

    /**
     * Returns the project meta URL.
     *
     * @returns {string}
     */
    public getProjectMetaUrl(): string {

        return this.projectMetaURL;
    }

    /**
     * Returns the complete URL for the meta download for the specified project.
     * 
     * @param {string} projectId
     * @returns {string}
     */
    public getProjectMetaDownloadUrl(projectId: string): string {

        return `${this.getProjectMetaUrl()}${APIEndpoints.PROJECT_METADATA}/${projectId}.tsv`;
    }

    /**
     * Returns the complete URL for the download of the prepared matrix for the specified project.
     *
     * @param {string} fileName
     * @returns {string}
     */
    public getProjectPreparedMatrixDownloadUrl(fileName: string): string {

        return `${this.getProjectMetaUrl()}${APIEndpoints.PROJECT_MATRICES}/${fileName}`;
    }

    /**
     * Returns the URL for the project end point.
     *
     * @param {string} projectId
     * @returns {string}
     */
    public getProjectUrl(projectId: string): string {

        const pathBase = this.getIndexBasePath();
        const projectsPath = APIEndpoints.PROJECTS;
        return `${this.dataURL}${pathBase}${projectsPath}/${projectId}`;
    }

    /**
     * Return the full URL for the specified release file URL.
     * 
     * @param {string} releaseFileUrl
     * @returns {string}
     */
    public getReleaseFileUrl(releaseFileUrl: string): string {

        return `${this.getProjectMetaUrl()}${APIEndpoints.RELEASES}/${releaseFileUrl}`;
    }

    /**
     * Return the full URL for the specified release file URL.
     *
     * @param {string} encdodedExportUrl
     * @returns {string}
     */
    public getTerraExportUrl(encdodedExportUrl: string): string {

        return `${this.terraExportURL}#import-data?url=${encdodedExportUrl}`;
    }
    
    /**
     * Returns the URL for the summary end point.
     *
     * @returns {string}
     */
    public getSummaryUrl(): string {

        const pathBase = this.getIndexBasePath();
        const summaryPath = APIEndpoints.SUMMARY;
        return `${this.dataURL}${pathBase}${summaryPath}`;
    }

    /**
     * Initialize config on app init. Must return promise here as this method is called during Angular's app
     * initialization and we need to resolve the config details before any components are instantiated. The config
     * details are saved on this config service as local state (for easy access from calling classes where we don't
     * want to handle Observables) as well as in the store.
     *
     * @returns {Promise<Config>}
     */
    public initConfig(): Promise<Config> {

        this.storeConfig(environment as Config);
        return Promise.resolve(environment as Config);
    }

    /**
     * Returns true if the current environment is cgl-dev.
     *
     * @returns {boolean}
     */
    public isEnvCGLDev(): boolean {

        return this.deployment === "cgl-dev";
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
     * Returns true if the current environment is dpc2.
     * 
     * @returns {boolean}
     */
    public isEnvDCP2(): boolean {

        return this.deployment === "dcp2";
    }

    /**
     * Returns true if the current environment is prod.
     *
     * @returns {boolean}
     */
    public isEnvProd(): boolean {

        return this.deployment === "prod";
    }

    /**
     * Returns true if the current environment is a version 2.0 environment.
     * 
     * @returns {boolean}
     */
    public isV2(): boolean {

        return this.version === this.VERSION_2_0;
    }

    /**
     * Returns true if the specified version matches the version running in the current environment.
     *
     * @param {string} version
     * @returns {boolean}
     */
    public isCurrentVersion(version: string): boolean {

        return version === this.version;
    }

    /**
     * Returns the Zendesk URL for this environment.
     *
     * @returns {string}
     */
    public getZendeskUrl(): string {

        return this.zendeskURL;
    }
    
    /**
     * Returns the "base path" for index/repository API calls.
     */
    private getIndexBasePath(): string {

        if ( this.isV2() ){
            return "/index";
        }
        
        return "/repository";
    }

    /**
     * Config is saved on this config service as local state (for easy access from calling classes where we don't
     * want to handle Observables) as well as in the store.
     *
     * @param config {Config}
     */
    private storeConfig(config: Config): void {

        this.atlas = config.atlas;
        this.dataURL = config.dataURL;
        this.matrixURL = config.matrixURL;
        this.dcpHealthCheckUrl = config.dcpHealthCheckUrl;
        this.deployment = config.deployment;
        this.portalURL = config.portalURL;
        this.projectMetaURL = config.projectMetaURL;
        this.terraExportURL = config.terraExportURL;
        this.version = config.version;
        this.zendeskURL = config.zendeskURL;
        this.store.dispatch(new FetchConfigRequestSuccessAction(config));
    }
}
