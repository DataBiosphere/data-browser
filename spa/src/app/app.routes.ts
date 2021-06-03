/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of top-level routes used by HCA Data Portal.
 */

// Core dependencies
import { Route } from "@angular/router";

export const AppRoutes: Route[] = [
    {
        path: "",
        children: [
            {
                path: "",
                redirectTo: "/projects",
                pathMatch: "full"
            },
            {
                path: "**",
                redirectTo: "/projects",
                pathMatch: "full"
            }
        ]
    }
];
