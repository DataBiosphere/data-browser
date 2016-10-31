import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";

import { CCHttpModule } from "../cc-http/cc-http.module";
import { CcPipeModule } from "../cc-pipe/cc-pipe.module";
import { FilesEffects } from "./shared/files.effects";

import { routes } from "./files.routes";

import { FilesComponent } from "./files.component";
import { FileSummaryComponent } from "./file-summary/file-summary.component";
import { FileFacetsComponent } from "./file-facets/file-facets.component";

import { FilesDispatcher } from "./shared/files.dispatcher";
import { FilesService } from "./shared/files.service";
import { FilesDAO } from "./shared/files.dao";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        EffectsModule.run(FilesEffects),
        CCHttpModule,
        CcPipeModule
    ],
    declarations: [
        FilesComponent,
        FileSummaryComponent,
        FileFacetsComponent
    ],
    providers: [
        FilesService,
        FilesDAO,
        FilesDispatcher
    ]
})
export class FilesModule {
}
