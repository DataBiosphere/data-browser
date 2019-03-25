/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Files module definition.
 */

// Core dependencies
import { ClipboardModule } from "ngx-clipboard";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
import { CcTypeaheadModule } from "../cc-typeahead/cc-typeahead.module";
import { ConfigService } from "../config/config.service";
import { FacetFileFormatListComponent } from "./facet-file-format-list/facet-file-format-list.component";
import { FilesComponent } from "./files.component";
import { FileManifestSummaryComponent } from "./file-manifest-summary/file-manifest-summary.component";
import { routes } from "./files.routes";
import { FileNameShortenerPipe } from "./shared/file-name-shortener";
import { FileSummaryComponent } from "./file-summary/file-summary.component";
import { KeywordsModule } from "../keywords/keywords.module";
import { HCAContentEllipsisComponent } from "./hca-content-ellipsis/hca-content-ellipsis.component";
import { HCADesktopBannerComponent } from "./hca-desktop-banner/hca-desktop-banner.component";
import { HCADownloadFileComponent } from "./hca-download-file/hca-download-file.component";
import { HCADownloadManifestComponent } from "./hca-download-manifest/hca-download-manifest.component";
import { HCADownloadManifestModalComponent } from "./hca-download-manifest-modal/hca-download-manifest-modal.component";
import { HCAExportToTerraComponent } from "./hca-export-to-terra/hca-export-to-terra.component";
import { HCAExportToTerraModalComponent } from "./hca-export-to-terra-modal/hca-export-to-terra-modal.component";
import { HCAFacetTermListComponent } from "./hca-facet-term-list/hca-facet-term-list.component";
import { HCAFileFacetComponent } from "./hca-file-facet/hca-file-facet.component";
import { HCAFileFilterComponent } from "./hca-file-filter/hca-file-filter.component";
import { HCAFileFilterResultComponent } from "./hca-file-filter-result/hca-file-filter-result.component";
import { HCAFileFilterWrapperComponent } from "./hca-file-filter-wrapper/hca-file-filter-wrapper.component";
import { HCAFileSummaryComponent } from "./hca-file-summary/hca-file-summary.component";
import { HCAProjectComponent } from "./hca-project/hca-project.component";
import { HCARequestMatrixComponent } from "./hca-request-matrix/hca-request-matrix.component";
import { HCARequestMatrixModalComponent } from "./hca-request-matrix-modal/hca-request-matrix-modal.component";
import { HCATableComponent } from "./hca-table/hca-table.component";
import { HCATableDataStatusPlaceholderComponent } from "./hca-table-data-status-placeholder/hca-table-data-status-placeholder.component";
import { HCATableFilesComponent } from "./hca-table-files/hca-table-files.component";
import { HCATablePaginationComponent } from "./hca-table-pagination/hca-table-pagination.component";
import { HCATableProjectsComponent } from "./hca-table-projects/hca-table-projects.component";
import { HCATableCellComponent } from "./hca-table-cell/hca-table-cell.component";
import { HCATableColumnHeaderComponent } from "./hca-table-column-header/hca-table-column-header.component";
import { HCATableColumnHeaderTitleComponent } from "./hca-table-column-header-title/hca-table-column-header-title.component";
import { HCATableSortComponent } from "./hca-table-sort/hca-table-sort.component";
import { HCATooltipComponent } from "./hca-tooltip/hca-tooltip.component";
import { DownloadService } from "./shared/download.service";
import { DownloadDAO } from "./shared/download.dao";
import { FilesDAO } from "./shared/files.dao";
import { FilesService } from "./shared/files.service";
import { ProjectService } from "./shared/project.service";
import { ProjectDAO } from "./shared/project.dao";
import { MatrixService } from "./shared/matrix.service";
import { MatrixDAO } from "./shared/matrix.dao";
import { SharedModule } from "../shared/shared.module";
import { TerraService } from "./shared/terra.service";
import { TerraDAO } from "./shared/terra.dao";
import { FileHttpService } from "./shared/file-http.service";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ClipboardModule,
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
        CcTypeaheadModule,

        KeywordsModule,

        HttpClientModule,

        SharedModule
    ],
    declarations: [

        FacetFileFormatListComponent,

        FileSummaryComponent,
        FileManifestSummaryComponent,

        FilesComponent,

        HCAContentEllipsisComponent,
        HCADesktopBannerComponent,
        HCADownloadFileComponent,
        HCADownloadManifestComponent,
        HCADownloadManifestModalComponent,
        HCAExportToTerraComponent,
        HCAExportToTerraModalComponent,
        HCAFacetTermListComponent,
        HCAFileFacetComponent,
        HCAFileFilterComponent,
        HCAFileFilterResultComponent,
        HCAFileFilterWrapperComponent,
        HCAProjectComponent,
        HCARequestMatrixComponent,
        HCARequestMatrixModalComponent,
        HCATableComponent,
        HCATableCellComponent,
        HCATableColumnHeaderComponent,
        HCATableColumnHeaderTitleComponent,
        HCATableDataStatusPlaceholderComponent,
        HCATableFilesComponent,
        HCATablePaginationComponent,
        HCATableProjectsComponent,
        HCATableSortComponent,
        HCATooltipComponent,

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
        FileHttpService,
        FilesService,
        FilesDAO,
        MatrixService,
        MatrixDAO,
        ProjectService,
        ProjectDAO,
        TerraService,
        TerraDAO,
        {provide: "Window", useValue: window} // Required for hamburger functionality
    ],
    entryComponents: [
        HCADownloadManifestModalComponent,
        HCAExportToTerraModalComponent,
        HCARequestMatrixModalComponent
    ]
})
export class FilesModule {
}
