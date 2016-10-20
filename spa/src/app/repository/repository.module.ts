import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CCHttpModule } from "../cc-http";
import { CcPipeModule } from "../cc-pipe";

import { RepositoryService, RepositoryDAO } from "./shared";
import { repositoryRoutes } from "./repository.routes";
import { RepositoryComponent } from "./repository.component";
import { RepositorySummaryComponent } from "./repository-summary";
import { RepositoryFilesComponent } from "./repository-files";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(repositoryRoutes),

        CCHttpModule,
        CcPipeModule
    ],
    declarations: [
        RepositoryComponent,
        RepositorySummaryComponent,
        RepositoryFilesComponent
    ],
    providers: [
        RepositoryService,
        RepositoryDAO
    ]
})
export class RepositoryModule {
}
