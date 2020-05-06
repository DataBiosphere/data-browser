/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Files module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material";
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
import { AnalysisProtocolPipelineLinkerComponent } from "./analysis-protocol-pipeline-linker/analysis-protocol-pipeline-linker.component";
import { DataDownloadCitationComponent } from "./data-download-citation/data-download-citation.component";
import { FilesComponent } from "./files.component";
import { FileManifestSummaryComponent } from "./file-manifest-summary/file-manifest-summary.component";
import { routes } from "./files.routes";
import { FacetAgeRangeFormComponent } from "./facet/facet-age-range/facet-age-range-form/facet-age-range-form.component";
import { FacetDisplayService } from "./facet/facet-display.service";
import { FacetGroupComponent } from "./facet/facet-group/facet-group.component";
import { FacetMenuComponent } from "./facet/facet-menu/facet-menu.component";
import { FacetMenuContentComponent } from "./facet/facet-menu-content/facet-menu-content.component";
import { FacetMenuTitleComponent } from "./facet/facet-menu-title/facet-menu-title.component";
import { FacetToolbarWrapperComponent } from "./facet/facet-toolbar-wrapper/facet-toolbar-wrapper.component";
import { FacetToolbarComponent } from "./facet/facet-toolbar/facet-toolbar.component";
import { FileFacetComponent } from "./facet/file-facet/file-facet.component";
import { FileTypeSummaryListComponent } from "./file-type-summary-list/file-type-summary-list.component";
import { HCAContentEllipsisComponent } from "./hca-content-ellipsis/hca-content-ellipsis.component";
import { HCAContentUnspecifiedDashComponent } from "./hca-content-unspecified-bar/hca-content-unspecified-dash.component";
import { HCADownloadFileComponent } from "./hca-download-file/hca-download-file.component";
import { DisplayDataLinkComponent } from "./hca-get-data/display-data-link/display-data-link.component";
import { HCAExportToTerraComponent } from "./hca-get-data/hca-export-to-terra/hca-export-to-terra.component";
import { FacetTermListComponent } from "./facet/facet-term-list/facet-term-list.component";
import { HCAFileSummaryComponent } from "./hca-file-summary/hca-file-summary.component";
import { HCAGetDataComponent } from "./hca-get-data/hca-get-data.component";
import { HCAGetDataDownloadsComponent } from "./hca-get-data/hca-get-data-downloads/hca-get-data-downloads.component";
import { HCAGetDataPanelComponent } from "./hca-get-data/hca-get-data-panel/hca-get-data-panel.component";
import { HCAGetDataFileSummaryComponent } from "./hca-get-data/hca-get-data-file-summary/hca-get-data-file-summary.component";
import { HCAGetDataSummaryComponent } from "./hca-get-data/hca-get-data-summary/hca-get-data-summary.component";
import { HCAGetManifestComponent } from "./hca-get-data/hca-get-manifest/hca-get-manifest.component";
import { HCAGetMatrixComponent } from "./hca-get-data/hca-get-matrix/hca-get-matrix.component";
import { HCAGetMatrixSpeciesSelectionComponent } from "./hca-get-data/hca-get-matrix-species-selection/hca-get-matrix-species-selection.component";
import { LeftBarComponent } from "./left-bar/left-bar.component";
import { MatrixPartialQueryMatchWarningComponent } from "./hca-get-data/matrix-partial-query-match-warning/matrix-partial-query-match-warning.component";
import { MatrixUrlRequestFormComponent } from "./hca-get-data/matrix-url-request-form/matrix-url-request-form.component";
import { MatrixUrlRequestCompletedComponent } from "./hca-get-data/matrix-url-request-completed/matrix-url-request-completed.component";
import { HCAEllipsisTextComponent } from "./hca-content-ellipsis/hca-ellipsis-text.component";
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
import { ModalModule } from "../modal/modal.module";
import { ProjectAnalysisPortalsComponent } from "./project-analysis-portals/project-analysis-portals.component";
import { ProjectDataCitationComponent } from "./project-data-citation/project-data-citation.component";
import { ProjectDeprecatedComponent } from "./project-deprecated/project-deprecated.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectDownloadManifestComponent } from "./project-download-manifest/project-download-manifest.component";
import { ProjectDownloadManifestModalComponent } from "./project-download-manifest-modal/project-download-manifest-modal.component";
import { ProjectDownloadManifestModalContainerComponent } from "./project-download-manifest-modal-container/project-download-manifest-modal-container.component";
import { ProjectDownloadMatrixComponent } from "./project-download-matrix/project-download-matrix.component";
import { ProjectDownloadMatrixModalComponent } from "./project-download-matrix-modal/project-download-matrix-modal.component";
import { ProjectDownloadMatrixModalContainerComponent } from "./project-download-matrix-modal-container/project-download-matrix-modal-container.component";
import { ProjectDownloadTSVComponent } from "./project-download-tsv/project-download-tsv.component";
import { ProjectExpressionMatricesComponent } from "./project-expression-matrices/project-expression-matrices.component";
import { ProjectExternalResourcesComponent } from "./project-external-resources/project-external-resources.component";
import { ProjectGuardComponent } from "./project-guard/project-guard.component";
import { ProjectIntegrationsComponent } from "./project-integrations/project-integrations.component";
import { ProjectIngestInProgressComponent } from "./project-ingest-in-progress/project-ingest-in-progress.component";
import { ProjectSupplementaryLinksComponent } from "./project-supplementary-links/project-supplementary-links.component";
import { ProjectMetadataComponent } from "./project-metadata/project-metadata.component";
import { ProjectNavComponent } from "./project-nav/project-nav.component";
import { ProjectOverviewComponent } from "./project-overview/project-overview.component";
import { ProjectOverviewDataSummaryComponent } from "./project-overview-data-summary/project-overview-data-summary.component";
import { ProjectReleaseComponent } from "./project-release/project-release.component";
import { ProjectEditsService } from "./shared/project-edits.service";
import { ProjectService } from "./project/project.service";
import { ProjectSummaryStatsComponent } from "./project-summary-stats-component/project-summary-stats.component";
import { ProjectViewFactory } from "./project-view/project-view.factory";
import { ReleaseComponent } from "./releases/release.component";
import { ReleaseFilesModalComponent } from "./releases/release-files-modal/release-files-modal.component";
import { ReleaseFilesModalContainerComponent } from "./releases/release-files-modal-container/release-files-modal-container.component";
import { ReleaseTableComponent } from "./releases/release-table/release-table.component";
import { ReleaseTitleOverlineComponent } from "./releases/release-title-overline/release-title-overline.component";
import { SearchTermHttpService } from "./search/http/search-term-http.service";
import { DownloadService } from "./shared/download.service";
import { FileManifestService } from "./shared/file-manifest.service";
import { FileNameShortenerPipe } from "./shared/file-name-shortener";
import { FilesService } from "./shared/files.service";
import { IntegrationService } from "./shared/integration.service";
import { MatrixService } from "./shared/matrix.service";
import { SharedModule } from "../shared/shared.module";
import { TerraService } from "./shared/terra.service";
import { ResponseTermService } from "./http/response-term.service";
import { TermSortService } from "./sort/term-sort.service";
import { TableRendererService } from "./table/table-renderer.service";
import { TableScroll } from "./table-scroll/table-scroll.component";
import { ReleaseService } from "./shared/release.service";
import { ReleaseVisualizationsModalComponent } from "./releases/release-visualizations-modal/release-visualizations-modal.component";
import { ReleaseVisualizationsModalContainerComponent } from "./releases/visualizations-modal-container/release-visualizations-modal-container.component";
import { SelectedSearchTermsComponent } from "./search/selected-search-terms/selected-search-terms.component";
import { SearchTermUrlService } from "./search/url/search-term-url.service";

@NgModule({
    imports: [
        FormsModule,
        HttpClientModule,
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
        ModalModule,
        SharedModule
    ],
    declarations: [
        AnalysisProtocolPipelineLinkerComponent,
        DataDownloadCitationComponent,
        DisplayDataLinkComponent,
        FacetAgeRangeFormComponent,
        FacetGroupComponent,
        FacetMenuComponent,
        FacetMenuContentComponent,
        FacetMenuTitleComponent,
        FacetToolbarComponent,
        FacetToolbarWrapperComponent,
        FileFacetComponent,
        FileManifestSummaryComponent,
        FileNameShortenerPipe,
        FileTypeSummaryListComponent,
        FilesComponent,
        HCAContentEllipsisComponent,
        HCAContentUnspecifiedDashComponent,
        HCADownloadFileComponent,
        HCAEllipsisTextComponent,
        HCAExportToTerraComponent,
        FacetTermListComponent,
        HCAFileSummaryComponent,
        HCAGetDataComponent,
        HCAGetDataDownloadsComponent,
        HCAGetDataFileSummaryComponent,
        HCAGetDataPanelComponent,
        HCAGetDataSummaryComponent,
        HCAGetManifestComponent,
        HCAGetMatrixComponent,
        HCAGetMatrixSpeciesSelectionComponent,
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
        LeftBarComponent,
        MatrixPartialQueryMatchWarningComponent,
        MatrixUrlRequestCompletedComponent,
        MatrixUrlRequestFormComponent,
        ProjectAnalysisPortalsComponent,
        ProjectDataCitationComponent,
        ProjectDeprecatedComponent,
        ProjectDetailComponent,
        ProjectDownloadManifestComponent,
        ProjectDownloadManifestModalComponent,
        ProjectDownloadManifestModalContainerComponent,
        ProjectDownloadMatrixComponent,
        ProjectDownloadMatrixModalComponent,
        ProjectDownloadMatrixModalContainerComponent,
        ProjectDownloadTSVComponent,
        ProjectExpressionMatricesComponent,
        ProjectExternalResourcesComponent,
        ProjectGuardComponent,
        ProjectIngestInProgressComponent,
        ProjectIntegrationsComponent,
        ProjectMetadataComponent,
        ProjectNavComponent,
        ProjectOverviewComponent,
        ProjectOverviewDataSummaryComponent,
        ProjectReleaseComponent,
        ProjectSummaryStatsComponent,
        ProjectSupplementaryLinksComponent,
        ReleaseComponent,
        ReleaseFilesModalComponent,
        ReleaseFilesModalContainerComponent,
        ReleaseVisualizationsModalComponent,
        ReleaseVisualizationsModalContainerComponent,
        ReleaseTableComponent,
        ReleaseTitleOverlineComponent,
        SelectedSearchTermsComponent,
        TableScroll
    ],
    entryComponents: [
        ProjectDownloadManifestModalComponent,
        ProjectDownloadMatrixModalComponent,
        ReleaseFilesModalComponent,
        ReleaseVisualizationsModalComponent
    ],
    providers: [
        ConfigService,
        DownloadService,
        FacetDisplayService,
        FileManifestService,
        FilesService,
        IntegrationService,
        SearchTermUrlService,
        MatrixService,
        ProjectService,
        ProjectEditsService,
        ProjectViewFactory,
        ReleaseService,
        SearchTermHttpService,
        TableRendererService,
        ResponseTermService,
        TermSortService,
        TerraService,
        {provide: "Window", useValue: window} // Required for hamburger functionality
    ],
})
export class FilesModule {
}
