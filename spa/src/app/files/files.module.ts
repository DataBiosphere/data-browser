// Core dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import {
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdTooltipModule
} from "@angular/material";

// App dependencies
import { CCHttpModule } from "../cc-http/cc-http.module";
import { CcPipeModule } from "../cc-pipe/cc-pipe.module";
import { CcTypeaheadModule } from "../cc-typeahead/cc-typeahead.module";
import { FacetTermChartComponent } from "./facet-term-chart/facet-term-chart.component";
import { FacetTermListComponent } from "./facet-term-list/facet-term-list.component";
import { FilesComponent } from "./files.component";
import { FileFacetsComponent } from "./file-facets/file-facets.component";
import { FileFacetFormDialog } from "./file-facet-form/file-facet-form.dialog";
import { FileManifestSummaryComponent } from "./file-manifest-summary/file-manifest-summary.component";
import { routes } from "./files.routes";
import { FileSearchComponent } from './file-search/file-search.component';
import { FileSummaryComponent } from "./file-summary/file-summary.component";
import { KeywordsModule } from "../keywords/keywords.module";
import { FilesDAO } from "./shared/files.dao";
import { FilesEffects } from "./shared/files.effects";
import { FilesService } from "./shared/files.service";

/**
 * Files module definition.
 */
@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule,
        MdDialogModule,
        MdIconModule,
        MdTooltipModule,
        RouterModule.forChild(routes),

        CCHttpModule,
        CcPipeModule,
        CcTypeaheadModule,
        KeywordsModule,

        // EffectsModule.run(FilesEffects)
    ],
    declarations: [

        FacetTermChartComponent,
        FacetTermListComponent,

        FileSummaryComponent,
        FileFacetsComponent,
        FileManifestSummaryComponent,
        FileSearchComponent,

        FileFacetFormDialog,

        FilesComponent
    ],
    entryComponents: [

        FileFacetFormDialog,
    ],
    providers: [
        FilesService,
        FilesDAO
    ]
})
export class FilesModule {}
