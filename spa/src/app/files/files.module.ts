// Core dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule
} from "@angular/material";

// App dependencies
import { CCHttpModule } from "../cc-http/cc-http.module";
import { CcPipeModule } from "../cc-pipe/cc-pipe.module";
import { CCStopPropagationModule } from "../cc-stop-propagation/cc-stop-propagation.module";
import { CcTypeaheadModule } from "../cc-typeahead/cc-typeahead.module";
import { FacetTermChartComponent } from "./facet-term-chart/facet-term-chart.component";
import { FacetTermListComponent } from "./facet-term-list/facet-term-list.component";
import { FilesComponent } from "./files.component";
import { FileFacetsComponent } from "./file-facets/file-facets.component";
import { FileFacetComponent } from "./file-facet/file-facet.component";
import { FileFacetMenuComponent } from "./file-facet-menu/file-facet-menu.component";
import { FileFacetSearchComponent } from "./file-facet-search/file-facet-search.component";
import { FileFacetSearchMenuComponent } from "./file-facet-search-menu/file-facet-search-menu.component";
import { FileManifestSummaryComponent } from "./file-manifest-summary/file-manifest-summary.component";
import { routes } from "./files.routes";
import { FileNameShortenerPipe } from "./file-search/file-name-shortener";
import { FileSearchComponent } from "./file-search/file-search.component";
import { FileSummaryComponent } from "./file-summary/file-summary.component";
import { KeywordsModule } from "../keywords/keywords.module";
import { FilesDAO } from "./shared/files.dao";
import { FilesService } from "./shared/files.service";
import { ConfigService } from "../shared/config.service";
import { TableComponent } from "./table/table.component";


/**
 * Files module definition.
 */
@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatTooltipModule,
        RouterModule.forChild(routes),

        CCHttpModule,
        CcPipeModule,
        CCStopPropagationModule,
        CcTypeaheadModule,

        KeywordsModule

        // EffectsModule.run(FilesEffects)
    ],
    declarations: [

        FacetTermChartComponent,
        FacetTermListComponent,

        FileSummaryComponent,
        FileFacetsComponent,
        FileManifestSummaryComponent,
        FileSearchComponent,

        FilesComponent,

        FileFacetComponent,
        FileFacetMenuComponent,
        FileFacetSearchComponent,
        FileFacetSearchMenuComponent,
        TableComponent,

        FileNameShortenerPipe],
    providers: [
        ConfigService,
        FilesService,
        FilesDAO,
        { provide: "Window",  useValue: window } // Required for hamburger functionality
    ]
})
export class FilesModule {}
