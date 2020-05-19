/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of config required for setting up this instance of the browser.
 */

export class Config {

    public readonly dataURL: string;
    public readonly dcpHealthCheckUrl: string;
    public readonly matrixURL: string;
    public readonly portalURL: string;
    public readonly deployment: string;
    public readonly projectMetaURL: string;
    public readonly version: string;

    /**
     * @param {string} dataURL
     * @param {string} dcpHealthCheckUrl
     * @param {string} deployment
     * @param {string} matrixURL
     * @param {string} portalURL
     * @param {string} projectMetaURL
     * @param {string} version
     */
    constructor(dataURL: string,
                dcpHealthCheckUrl: string,
                deployment: string,
                matrixURL: string,
                portalURL: string,
                projectMetaURL: string,
                version: string) {

        this.dataURL = dataURL;
        this.dcpHealthCheckUrl = dcpHealthCheckUrl;
        this.matrixURL = matrixURL;
        this.deployment = deployment;
        this.portalURL = portalURL;
        this.projectMetaURL = projectMetaURL;
        this.version = version;
    }
}
