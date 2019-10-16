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

    /**
     * @param {string} dataURL
     * @param {string} dcpHealthCheckUrl
     * @param {string} matrixURL
     * @param {string} portalURL
     * @param {string} projectMetaURL
     */
    constructor(dataURL: string,
                dcpHealthCheckUrl: string,
                matrixURL: string,
                portalURL: string,
                projectMetaURL: string,
                deployment: string) {

        this.dataURL = dataURL;
        this.dcpHealthCheckUrl = dcpHealthCheckUrl;
        this.matrixURL = matrixURL;
        this.deployment = deployment;
        this.portalURL = portalURL;
        this.projectMetaURL = projectMetaURL;
    }
}
