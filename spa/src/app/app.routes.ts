import { Route } from "@angular/router";


export const routes: Route[] = [
    { path: "", redirectTo: "/boardwalk", pathMatch: "full" },
    // { path: "files", loadChildren: "./files/files.module#FilesModule" } // TODO revisit - do we need lazy loading here? does this conflict with including FilesModule in app module?
];
