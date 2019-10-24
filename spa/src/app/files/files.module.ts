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

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";

// App dependencies
import { CcPipeModule } from "../cc-pipe/cc-pipe.module";
import { ConfigService } from "../config/config.service";
import { FilesComponent } from "./files.component";
import { FileManifestSummaryComponent } from "./file-manifest-summary/file-manifest-summary.component";
import { routes } from "./files.routes";
import { FileTypeSummaryListComponent } from "./file-type-summary-list/file-type-summary-list.component";
import { HCAContentEllipsisComponent } from "./hca-content-ellipsis/hca-content-ellipsis.component";
import { HCAContentUnspecifiedDashComponent } from "./hca-content-unspecified-bar/hca-content-unspecified-dash.component";
import { HCADownloadFileComponent } from "./hca-download-file/hca-download-file.component";
import { HCAExportToTerraComponent } from "./hca-get-data/hca-export-to-terra/hca-export-to-terra.component";
import { HCAFacetTermListComponent } from "./hca-facet-term-list/hca-facet-term-list.component";
import { HCAFileFacetComponent } from "./hca-file-facet/hca-file-facet.component";
import { HCAFileFilterComponent } from "./hca-file-filter/hca-file-filter.component";
import { HCAFileFilterResultComponent } from "./hca-file-filter-result/hca-file-filter-result.component";
import { HCAFileFilterWrapperComponent } from "./hca-file-filter-wrapper/hca-file-filter-wrapper.component";
import { HCAFileSummaryComponent } from "./hca-file-summary/hca-file-summary.component";
import { HCAGetDataComponent } from "./hca-get-data/hca-get-data.component";
import { HCAGetDataDownloadsComponent } from "./hca-get-data/hca-get-data-downloads/hca-get-data-downloads.component";
import { HCAGetDataPanelComponent } from "./hca-get-data/hca-get-data-panel/hca-get-data-panel.component";
import { CopyToClipboardComponent } from "./hca-get-data/copy-to-clipboard/copy-to-clipboard.component";
import { HCAGetDataFileSummaryComponent } from "./hca-get-data/hca-get-data-file-summary/hca-get-data-file-summary.component";
import { HCAGetDataSummaryComponent } from "./hca-get-data/hca-get-data-summary/hca-get-data-summary.component";
import { HCAGetManifestComponent } from "./hca-get-data/hca-get-manifest/hca-get-manifest.component";
import { HCAGetMatrixComponent } from "./hca-get-data/hca-get-matrix/hca-get-matrix.component";
import { MatrixPartialQueryMatchWarningComponent } from "./hca-get-data/matrix-partial-query-match-warning/matrix-partial-query-match-warning.component";
import { MatrixUrlRequestFormComponent } from "./hca-get-data/matrix-url-request-form/matrix-url-request-form.component";
import { MatrixUrlRequestProgressComponent } from "./hca-get-data/matrix-url-request-progress/matrix-url-request-progress.component";
import { HCAEllipsisTextComponent } from "./hca-content-ellipsis/hca-ellipsis-text.component";
import { HCAProjectComponent } from "./hca-project/hca-project.component";
import { HCATableColumnHeaderComponent } from "./hca-table-column-header/hca-table-column-header.component";
import { HCATableColumnHeaderCountComponent } from "./hca-table-column-header-count/hca-table-column-header-count.component";
import { HCATableColumnHeaderDownloadComponent } from "./hca-table-column-header-download/hca-table-column-header-download.component";
import { HCATableColumnHeaderTitleComponent } from "./hca-table-column-header-title/hca-table-column-header-title.component";
import { HCASearchComponent } from "./hca-search/hca-search.component";
import { HCATableCellComponent } from "./hca-table-cell/hca-table-cell.component";
import { HCATableDataStatusPlaceholderComponent } from "./hca-table-data-status-placeholder/hca-table-data-status-placeholder.component";
import { HCATableFilesComponent } from "./hca-table-files/hca-table-files.component";
import { HCATablePaginationComponent } from "./hca-table-pagination/hca-table-pagination.component";
import { HCATableProjectsComponent } from "./hca-table-projects/hca-table-projects.component";
import { HCATableSamplesComponent } from "./hca-table-samples/hca-table-samples.component";
import { HCATableSortComponent } from "./hca-table-sort/hca-table-sort.component";
import { HCATooltipComponent } from "./hca-tooltip/hca-tooltip.component";
import { ProjectService } from "./project/project.service";
import { ProjectDeprecatedComponent } from "./project-deprecated/project-deprecated.component";
import { ProjectDownloadsComponent } from "./project-downloads/project-downloads.component";
import { ProjectGuardComponent } from "./project-guard/project-guard.component";
import { ProjectIntegrationsComponent } from "./project-integrations/project-integrations.component";
import { ProjectIngestInProgressComponent } from "./project-ingest-in-progress/project-ingest-in-progress.component";
import { ProjectPreparedMatrixDownloadsComponent } from "./project-prepared-matrix-downloads/project-prepared-matrix-downloads.component";
import { ProjectTSVDownloadComponent } from "./project-tsv-download/project-tsv-download.component";
import { SearchTermService } from "./shared/search-term.service";
import { DownloadService } from "./shared/download.service";
import { FileFacetDisplayService } from "./shared/file-facet-display.service";
import { FileManifestService } from "./shared/file-manifest.service";
import { FileNameShortenerPipe } from "./shared/file-name-shortener";
import { FilesService } from "./shared/files.service";
import { IntegrationService } from "./shared/integration.service";
import { MatrixService } from "./shared/matrix.service";
import { SharedModule } from "../shared/shared.module";
import { TerraService } from "./shared/terra.service";
import { TermResponseService } from "./shared/term-response.service";
import { TermSortService } from "./sort/term-sort.service";
import { TableRendererService } from "./table/table-renderer.service";
import { TableScroll } from "./table-scroll/table-scroll.component";

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

        HttpClientModule,

        SharedModule
    ],
    declarations: [

        FileTypeSummaryListComponent,
        FileManifestSummaryComponent,
        FileNameShortenerPipe,
        FilesComponent,
        HCAContentEllipsisComponent,
        HCAContentUnspecifiedDashComponent,
        HCADownloadFileComponent,
        HCAEllipsisTextComponent,
        HCAExportToTerraComponent,
        HCAFacetTermListComponent,
        HCAFileFacetComponent,
        HCAFileFilterComponent,
        HCAFileFilterResultComponent,
        HCAFileFilterWrapperComponent,
        MatrixPartialQueryMatchWarningComponent,
        MatrixUrlRequestFormComponent,
        MatrixUrlRequestProgressComponent,
        ProjectDeprecatedComponent,
        ProjectDownloadsComponent,
        ProjectGuardComponent,
        ProjectIngestInProgressComponent,
        ProjectIntegrationsComponent,
        ProjectTSVDownloadComponent,
        ProjectPreparedMatrixDownloadsComponent,
        HCAGetDataComponent,
        HCAGetDataDownloadsComponent,
        HCAGetDataPanelComponent,
        CopyToClipboardComponent,
        HCAGetDataFileSummaryComponent,
        HCAGetDataSummaryComponent,
        HCAGetManifestComponent,
        HCAGetMatrixComponent,
        HCAProjectComponent,
        HCASearchComponent,
        HCATableCellComponent,
        HCATableColumnHeaderComponent,
        HCATableColumnHeaderCountComponent,
        HCATableColumnHeaderDownloadComponent,
        HCATableColumnHeaderTitleComponent,
        HCATableDataStatusPlaceholderComponent,
        HCATableFilesComponent,
        HCATablePaginationComponent,
        HCATableProjectsComponent,
        HCATableSamplesComponent,
        HCATableSortComponent,
        HCATooltipComponent,
        HCAFileSummaryComponent,
        TableScroll
    ],
    providers: [
        ConfigService,
        DownloadService,
        SearchTermService,
        FileFacetDisplayService,
        FileManifestService,
        FilesService,
        IntegrationService,
        MatrixService,
        ProjectService,
        TableRendererService,
        TermResponseService,
        TermSortService,
        TerraService,
        {provide: "Window", useValue: window} // Required for hamburger functionality
    ],
})
export class FilesModule {
}
