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
    "EXCEPTION" = "Exception",
    "LAUNCH" = "Launch",
    "NEXT_PAGE" = "Next Page",
    "PREVIOUS_PAGE" = "Previous Page",
    "REQUEST" = "Request",
    "RETURN_TO_TAB" = "Return to Tab",
    "SELECT" = "Select",
    "SELECT_TAB" = "Select Tab",
    "SORT" = "Sort",
    "VIEW_CATALOG" = "View Catalog",
    "VIEW_DATA_CITATION" = "View Data Citation", // View project data citation - not implemented
    "VIEW_DEPRECATED_PROJECT" = "View Deprecated Project", // View deprecated project
    "VIEW_EXTERNAL_RESOURCES" = "View External Resources", // View project external resources tab
    "VIEW_EXTERNAL_RESOURCE" = "View External Resource", // View an external resource associated with project
    "VIEW_MATRICES" = "View Matrices", // View project matrices tab
    "VIEW_METADATA" = "View Metadata", // View project metadata tab
    "VIEW_OVERVIEW" = "View Overview", // View project overview tab
    "VIEW_RELEASES" = "View Releases", // View project releases tab
    "VIEW_SUMMARY_STATS" = "View Summary Stats", // View project summary stats tab - not implemented
    "VIEW_WITHDRAWN_PROJECT" = "View Withdrawn Project", // View withdrawn project
    "VISUALIZE" = "Visualize"
}
