/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of Google Analytic actions.
 */

export enum GAAction {
    "CLEAR" = "Clear",
    "CLICK" = "Click",
    "COPY_TO_CLIPBOARD" = "Copy to Clipboard",
    "DESELECT" = "Deselect",
    "DOWNLOAD" = "Download",
    "LAUNCH" = "Launch",
    "REQUEST" = "Request",
    "SELECT" = "Select",
    "SORT" = "Sort",
    "VIEW_DATA_CITATION" = "View Data Citation", // View project data citation - not implemented
    "VIEW_EXTERNAL_RESOURCES" = "View External Resources", // View project external resources
    "VIEW_MATRICES" = "View Matrices", // View project matrices
    "VIEW_METADATA" = "View Metadata", // View project metadata
    "VIEW_OVERVIEW" = "View Overview", // View project overview
    "VIEW_RELEASES" = "View Releases", // View project releases
    "VIEW_SUMMARY_STATS" = "View External Resources", // View project summary stats - not implemented
    "VISUALIZE" = "Visualize"
}
