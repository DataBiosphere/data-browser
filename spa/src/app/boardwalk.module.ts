import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";

import { BoardwalkComponent } from "./boardwalk.component";
import { boardwalkRoutes } from "./boardwalk.routes";


import { FilesModule } from "./files/files.module";
import { boardWalkReducers } from "./shared/boardwalk.reducer";

@NgModule({
    bootstrap: [BoardwalkComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(boardwalkRoutes),

        StoreModule.provideStore(boardWalkReducers),

        FilesModule
    ],
    declarations: [
        BoardwalkComponent
    ]
})
export class BoardwalkModule {
}
