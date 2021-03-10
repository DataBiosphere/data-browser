/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Favicon-specific utility functions.
 */

// Core dependencies
import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class FaviconService {

    /**
     * @param {Document} document
     */
    constructor(@Inject(DOCUMENT) private document: Document) {}

    /**
     * Set the correct path for this environment, for each favicon and the manifest file.
     * 
     * @param {string} faviconPath
     */
    public setFaviconPaths(faviconPath: string) {
        
        const faviconsHTML = `
            <link rel="icon" type="image/png" sizes="32x32" href="${faviconPath}favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="128x128" href="${faviconPath}android-icon-128x128.png">
            <link rel="icon" type="image/png" sizes="192x192" href="${faviconPath}android-icon-192x192.png">
            <link rel="icon" type="image/png" sizes="196x196" href="${faviconPath}android-icon-196x196.png">
            <link rel="apple-touch-icon" sizes="152x152" href="${faviconPath}apple-icon-152x152.png">
            <link rel="apple-touch-icon" sizes="167x167" href="${faviconPath}apple-icon-167x167.png">
            <link rel="apple-touch-icon" sizes="180x180" href="${faviconPath}apple-icon-180x180.png">
            <link rel="manifest" href="${faviconPath}manifest.json">
            <meta name="theme-color" content="#ffffff">
        `;
        
        this.document.head.innerHTML += faviconsHTML;
    }
}
