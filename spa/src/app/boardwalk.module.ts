import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";

import { BoardwalkComponent } from "./boardwalk.component";

import { reducers } from "./shared";
import { boardwalkRoutes } from "./boardwalk.routes";
import { RepositoryModule } from "./repository";

@NgModule({
    bootstrap: [BoardwalkComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(boardwalkRoutes),

        StoreModule.provideStore(reducers),

        RepositoryModule
    ],
    declarations: [
        BoardwalkComponent
    ]
})
export class BoardwalkModule {
}
