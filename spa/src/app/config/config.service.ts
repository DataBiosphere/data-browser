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
import { AtlasName } from "../files/atlas/atlas-name.model";
import { Catalog } from "../files/catalog/catalog.model";
import { AppState } from "../_ngrx/app.state";
import { FetchConfigRequestSuccessAction } from "./_ngrx/config.actions";

@Injectable()
export class ConfigService {
    
    // Locals
    protected atlas: string;
    protected browserURL: string;
    protected dataURL: string; // Pulled from config store, saved as local state here on service
    protected defaultCatalog: Catalog;
    protected deployment: string;
    protected portalURL: string;
    protected projectMetaURL: string;
    protected terraExportURL: string;
    protected title: string; // Document (application) title
    protected store: Store<AppState>;
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
     * Returns the browser URL.
     * 
     * @returns {string}
     */
    public getBrowserUrl(): string {
        
        return this.browserURL;
    }

    /**
     * Returns the URL for the catalogs endpoint.
     *
     * @returns {string}
     */
    public getCatalogsUrl(): string {

        const path = this.getIndexPath();
        return `${path}${APIEndpoints.CATALOGS}`;
    }
    
    /**
     * Returns the default catalog for the current environment.
     * 
     * @returns {Catalog}
     */
    public getDefaultCatalog(): Catalog {

        return this.defaultCatalog;
    }

    /**
     * Returns the URL for an entities end point (projects, files, samples).
     * 
     * @param {string} entityName
     * @returns {string}
     */
    public getEntitiesUrl(entityName: string): string {

        const path = this.getIndexPath();
        return `${path}/${entityName}`;
    }

    /**
     * Returns the base path for the DB
     * 
     * @returns {string}
     */
    public getExploreBasePath(): string {
        
        if ( this.isEnvLocal() ) {
            return "";
        }

        return "/explore";
    }

    /**
     * Returns the favicon path for the current environment.
     * 
     * @returns {string}
     */
    public getFaviconPath(): string {

        const atlas = this.getAtlas();
        const atlasFaviconPath = atlas === AtlasName.HCA ? "" : `${atlas}/` ;
        return `assets/${atlasFaviconPath}images/favicon/`;
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
     * Returns the URL for the project end point.
     *
     * @param {string} projectId
     * @returns {string}
     */
    public getProjectUrl(projectId: string): string {

        const basePath = this.getIndexPath();
        const projectsPath = APIEndpoints.PROJECTS;
        return `${basePath}${projectsPath}/${projectId}`;
    }

    /**
     * Return the full URL for the specified Terra export URL.
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

        const basePath = this.getIndexPath();
        const summaryPath = APIEndpoints.SUMMARY;
        return `${basePath}${summaryPath}`;
    }

    /**
     * Returns the document title for the current config.
     * 
     * @returns {string}
     */
    public getTitle(): string {

        return this.title;
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
     * Returns true if the current environment is dpc2.
     * 
     * @returns {boolean}
     */
    public isEnvDCP2(): boolean {

        return this.deployment === "dcp2";
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
     * Returns the "base path" for index API calls.
     */
    private getIndexPath(): string {

        return `${this.dataURL}/index`;
    }

    /**
     * Config is saved on this config service as local state (for easy access from calling classes where we don't
     * want to handle Observables) as well as in the store.
     *
     * @param config {Config}
     */
    private storeConfig(config: Config): void {

        this.atlas = config.atlas;
        this.browserURL = config.browserURL;
        this.dataURL = config.dataURL;
        this.defaultCatalog = config.defaultCatalog;
        this.deployment = config.deployment;
        this.portalURL = config.portalURL;
        this.projectMetaURL = config.projectMetaURL;
        this.terraExportURL = config.terraExportURL;
        this.title = config.title;
        this.zendeskURL = config.zendeskURL;
        this.store.dispatch(new FetchConfigRequestSuccessAction(config));
    }
}
