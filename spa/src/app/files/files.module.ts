/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Files module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
} from "@angular/material";

// App dependencies
import { CCHttpModule } from "../cc-http/cc-http.module";
import { CcPipeModule } from "../cc-pipe/cc-pipe.module";
import { CCStopPropagationModule } from "../cc-stop-propagation/cc-stop-propagation.module";
import { CcTypeaheadModule } from "../cc-typeahead/cc-typeahead.module";
import { ConfigService } from "../config/config.service";
import { FacetFileListComponent } from "./facet-file-list/facet-file-list.component";
import { FacetTermChartComponent } from "./facet-term-chart/facet-term-chart.component";
import { FacetTermListComponent } from "./facet-term-list/facet-term-list.component";
import { FilesComponent } from "./files.component";
import { FileFacetsComponent } from "./file-facets/file-facets.component";
import { FileFacetComponent } from "./file-facet/file-facet.component";
import { FileFacetMenuComponent } from "./file-facet-menu/file-facet-menu.component";
import { FileFacetSearchComponent } from "./file-facet-search/file-facet-search.component";
import { FileFacetSearchMenuComponent } from "./file-facet-search-menu/file-facet-search-menu.component";
import { FileManifestSummaryComponent } from "./file-manifest-summary/file-manifest-summary.component";
import { FileFacetWrapperComponent } from "./file-facet-wrapper/file-facet-wrapper.component";
import { routes } from "./files.routes";
import { FileNameShortenerPipe } from "./file-search/file-name-shortener";
import { FileSearchComponent } from "./file-search/file-search.component";
import { FileSummaryComponent } from "./file-summary/file-summary.component";
import { KeywordsModule } from "../keywords/keywords.module";
import { HCADownloadManifestComponent } from "./hca-download-manifest/hca-download-manifest.component";
import { HCADownloadManifestModalComponent } from "./hca-download-manifest-modal/hca-download-manifest-modal.component";
import { HCAExploreComponent } from "app/files/hca-explore/hca-explore.component";
import { HCAFacetTermListComponent } from "./hca-facet-term-list/hca-facet-term-list.component";
import { HCAFileFacetComponent } from "./hca-file-facet/hca-file-facet.component";
import { HCAFileFilterComponent } from "app/files/hca-file-filter/hca-file-filter.component";
import { HCAFileFilterResultComponent } from "./hca-file-filter-result/hca-file-filter-result";
import { HCAFileFilterWrapperComponent } from "./hca-file-filter-wrapper/hca-file-filter-wrapper.component";
import { HCAFileSummaryComponent } from "./hca-file-summary/hca-file-summary.component";
import { HCATabComponent } from "app/files/hca-tab/hca-tab";
import { HCATableComponent } from "./hca-table/hca-table.component";
import { FilesDAO } from "./shared/files.dao";
import { FilesService } from "./shared/files.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),

        CCHttpModule,
        CcPipeModule,
        CCStopPropagationModule,
        CcTypeaheadModule,

        KeywordsModule

        // EffectsModule.run(FilesEffects)
    ],
    declarations: [

        FacetFileListComponent,
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
        FileFacetWrapperComponent,
        HCADownloadManifestComponent,
        HCADownloadManifestModalComponent,
        HCAExploreComponent,
        HCAFacetTermListComponent,
        HCAFileFacetComponent,
        HCAFileFilterComponent,
        HCAFileFilterResultComponent,
        HCAFileFilterWrapperComponent,
        HCATabComponent,
        HCATableComponent,

        FileNameShortenerPipe,

        // Components specific to Boardwalk instances
        HCAFileSummaryComponent
    ],
    exports: [
        HCADownloadManifestModalComponent
    ],
    providers: [
        ConfigService,
        FilesService,
        FilesDAO,
        {provide: "Window", useValue: window} // Required for hamburger functionality
    ],
    entryComponents: [
        HCADownloadManifestModalComponent,
    ]
})
export class FilesModule {
}
