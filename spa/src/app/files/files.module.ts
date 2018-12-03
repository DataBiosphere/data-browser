/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Files module definition.
 */

// Core dependencies
import { ClipboardModule } from "ngx-clipboard";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
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
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
} from "@angular/material";

// App dependencies
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
import { HCADesktopBannerComponent } from "./hca-desktop-banner/hca-desktop-banner.component";
import { HCADownloadFileComponent } from "./hca-download-file/hca-download-file.component";
import { HCADownloadManifestComponent } from "./hca-download-manifest/hca-download-manifest.component";
import { HCADownloadManifestModalComponent } from "./hca-download-manifest-modal/hca-download-manifest-modal.component";
import { HCAFacetTermListComponent } from "./hca-facet-term-list/hca-facet-term-list.component";
import { HCAFileFacetComponent } from "./hca-file-facet/hca-file-facet.component";
import { HCAFileFilterComponent } from "./hca-file-filter/hca-file-filter.component";
import { HCAFileFilterResultComponent } from "./hca-file-filter-result/hca-file-filter-result";
import { HCAFileFilterWrapperComponent } from "./hca-file-filter-wrapper/hca-file-filter-wrapper.component";
import { HCAFileSummaryComponent } from "./hca-file-summary/hca-file-summary.component";
import { HCAProjectComponent } from "./hca-project/hca-project.component";
import { HCARequestMatrixComponent } from "./hca-request-matrix/hca-request-matrix.component";
import { HCARequestMatrixModalComponent } from "./hca-request-matrix-modal/hca-request-matrix-modal.component";
import { HCASectionTitleComponent } from "./hca-section-title/hca-section-title.component";
import { HCATabComponent } from "./hca-tab/hca-tab";
import { HCATableComponent } from "./hca-table/hca-table.component";
import { HCATableFilesComponent } from "./hca-table-files/hca-table-files.component";
import { HCATableProjectsComponent } from "./hca-table-projects/hca-table-projects.component";
import { DownloadService } from "./shared/download.service";
import { DownloadDAO } from "./shared/download.dao";
import { FilesDAO } from "./shared/files.dao";
import { FilesService } from "./shared/files.service";
import { ProjectService } from "./shared/project.service";
import { ProjectDAO } from "./shared/project.dao";
import { MatrixService } from "./shared/matrix.service";
import { MatrixDAO } from "./shared/matrix.dao";

@NgModule({
    imports: [
        ClipboardModule,
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
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),

        CcPipeModule,
        CCStopPropagationModule,
        CcTypeaheadModule,

        KeywordsModule,

        HttpClientModule,

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
        HCADesktopBannerComponent,
        HCADownloadFileComponent,
        HCADownloadManifestComponent,
        HCADownloadManifestModalComponent,
        HCAFacetTermListComponent,
        HCAFileFacetComponent,
        HCAFileFilterComponent,
        HCAFileFilterResultComponent,
        HCAFileFilterWrapperComponent,
        HCAProjectComponent,
        HCARequestMatrixComponent,
        HCARequestMatrixModalComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        HCATableComponent,
        HCATableFilesComponent,
        HCATableProjectsComponent,

        FileNameShortenerPipe,

        // Components specific to Boardwalk instances
        HCAFileSummaryComponent
    ],
    exports: [
        HCADownloadManifestModalComponent,
        HCARequestMatrixModalComponent
    ],
    providers: [
        ConfigService,
        DownloadService,
        DownloadDAO,
        FilesService,
        FilesDAO,
        ProjectService,
        ProjectDAO,
        MatrixService,
        MatrixDAO,
        {provide: "Window", useValue: window} // Required for hamburger functionality
    ],
    entryComponents: [
        HCADownloadManifestModalComponent,
        HCARequestMatrixModalComponent
    ]
})
export class FilesModule {
}
