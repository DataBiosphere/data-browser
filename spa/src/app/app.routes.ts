/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of top-level routes used by HCA Data Portal.
 */

// Core dependencies
import { Route } from "@angular/router";

// App components
import { CatalogCanActivateGuard } from "./files/catalog/catalog.can-activate.guard";
import { BrowserCanActivateGuard } from "./shared/routing/browser.can-activate.guard";
import { ErrorComponent } from "./system/error/error.component";
import { NotFoundComponent } from "./system/not-found/not-found.component";

export const AppRoutes: Route[] = [
    {
        path: "",
        canActivateChild: [CatalogCanActivateGuard],
        children: [
            {
                path: "",
                redirectTo: "/projects",
                pathMatch: "full"
            }, {
                path: "error",
                canActivate: [BrowserCanActivateGuard],
                component: ErrorComponent
            }, {
                path: "not-found",
                canActivate: [BrowserCanActivateGuard],
                component: NotFoundComponent
            },
            {
                path: "**",
                redirectTo: "/projects",
                pathMatch: "full"
            }
        ]
    }
];
