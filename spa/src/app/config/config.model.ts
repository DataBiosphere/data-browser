/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of config required for setting up this instance of the browser.
 */

export class Config {

    public readonly atlas: string;
    public readonly dataURL: string;
    public readonly deployment: string;
    public readonly portalURL: string;
    public readonly projectMetaURL: string;
    public readonly terraExportURL: string;
    public readonly zendeskURL: string;

    /**
     * @param {string} atlas
     * @param {string} dataURL
     * @param {string} deployment
     * @param {string} portalURL
     * @param {string} projectMetaURL
     * @param {string} terraExportURL
     * @param {string} zendeskURL
     */
    constructor(atlas: string,
                dataURL: string,
                deployment: string,
                portalURL: string,
                projectMetaURL: string,
                terraExportURL: string,
                zendeskURL: string) {

        this.atlas = atlas;
        this.dataURL = dataURL;
        this.deployment = deployment;
        this.portalURL = portalURL;
        this.projectMetaURL = projectMetaURL;
        this.terraExportURL = terraExportURL;
        this.zendeskURL = zendeskURL;
    }
}
