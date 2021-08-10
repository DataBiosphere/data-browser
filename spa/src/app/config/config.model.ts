/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of config required for setting up this instance of the browser.
 */

export class Config {

    /**
     * @param {string} atlas
     * @param {string} browserURL
     * @param {string} dataURL
     * @param {string} defaultCatalog
     * @param {string} deployment
     * @param {string} googleOAuthClientId
     * @param {string} portalURL
     * @param {string} projectMetaURL
     * @param {string} terraExportURL
     * @param {string} terraURL
     * @param {string} title
     * @param {string} zendeskURL
     */
    constructor(public readonly atlas: string,
                public readonly browserURL: string,
                public readonly dataURL: string,
                public readonly defaultCatalog: string,
                public readonly deployment: string,
                public readonly googleOAuthClientId: string,
                public readonly portalURL: string,
                public readonly projectMetaURL: string,
                public readonly terraExportURL: string,
                public readonly terraURL: string,
                public readonly title: string,
                public readonly zendeskURL: string) {}
}
