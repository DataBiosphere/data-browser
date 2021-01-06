/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of config required for setting up this instance of the browser.
 */

export class Config {

    public readonly dataURL: string;
    public readonly dcpHealthCheckUrl: string;
    public readonly defaultCatalog: string;
    public readonly deployment: string;
    public readonly matrixURL: string;
    public readonly portalURL: string;
    public readonly projectMetaURL: string;
    public readonly terraExportURL: string;
    public readonly version: string;
    public readonly zendeskURL: string;

    /**
     * @param {string} dataURL
     * @param {string} dcpHealthCheckUrl
     * @param {string} defaultCatalog
     * @param {string} deployment
     * @param {string} matrixURL
     * @param {string} portalURL
     * @param {string} projectMetaURL
     * @param {string} terraExportURL
     * @param {string} version
     * @param {string} zendeskURL
     */
    constructor(dataURL: string,
                dcpHealthCheckUrl: string,
                defaultCatalog: string,
                deployment: string,
                matrixURL: string,
                portalURL: string,
                projectMetaURL: string,
                terraExportURL: string,
                version: string,
                zendeskURL: string) {

        this.dataURL = dataURL;
        this.dcpHealthCheckUrl = dcpHealthCheckUrl;
        this.defaultCatalog = defaultCatalog;
        this.matrixURL = matrixURL;
        this.deployment = deployment;
        this.portalURL = portalURL;
        this.projectMetaURL = projectMetaURL;
        this.terraExportURL = terraExportURL;
        this.version = version;
        this.zendeskURL = zendeskURL;
    }
}
