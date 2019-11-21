/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View model a file download link, containing the URL to the resource to be downloaded, as well as a display name for
 * the download.
 */

export interface FileDownloadLink {

    name?: string;
    url: string;
}
