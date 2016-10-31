import { Route } from "@angular/router";

export const boardwalkRoutes: Route[] = [
    { path: "", redirectTo: "/files", pathMatch: "full" },
    { path: "files", loadChildren: "./files/files.module#FilesModule" }
];
