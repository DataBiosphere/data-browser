/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Files module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
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
import { RouterModule } from "@angular/router";

// App dependencies
import { AnalysisProtocolPipelineLinkerComponent } from "./analysis-protocol-pipeline-linker/analysis-protocol-pipeline-linker.component";
import { AnnouncementCatalogComponent } from "./announcement-catalog/announcement-catalog.component";
import { AuthModule } from "../auth/auth.module";
import { BaseManifestDownloadComponent } from "./get-data/base-manifest-download.component.ts/base-manifest-download.component";
import { CatalogCanActivateGuard } from "./catalog/catalog.can-activate.guard";
import { CatalogFormComponent } from "./catalog/catalog-form/catalog-form.component";
import { CatalogService } from "./catalog/catalog.service";
import { CatalogUpdateChipComponent } from "./catalog/catalog-update-chip/catalog-update-chip.component";
import { ConfigService } from "../config/config.service";
import { EntityRequestService } from "./entity/entity-request.service";
import { AgeInAgeUnit } from "./facet/facet-age-range/facet-age-range-form/age-in-age-unit.pipe";
import { AgeUnitInAgeUnit } from "./facet/facet-age-range/facet-age-range-form/age-unit-in-age-unit.pipe";
import { AgeUnitInSeconds } from "./facet/facet-age-range/facet-age-range-form/age-unit-in-seconds.pipe";
import { FacetAgeRangeFormComponent } from "./facet/facet-age-range/facet-age-range-form/facet-age-range-form.component";
import { FacetDisplayService } from "./facet/facet-display.service";
import { FacetMenuComponent } from "./facet/facet-menu/facet-menu.component";
import { FacetMenuOptionComponent } from "./facet/facet-menu-option/facet-menu-option.component";
import { FacetMenuOptionContentComponent } from "./facet/facet-menu-option-content/facet-menu-option-content.component";
import { FacetMenuOptionTitleComponent } from "./facet/facet-menu-option-title/facet-menu-option-title.component";
import { FacetTermListComponent } from "./facet/facet-term-list/facet-term-list.component";
import { FacetToolbarComponent } from "./facet/facet-toolbar/facet-toolbar.component";
import { FileFacetComponent } from "./facet/file-facet/file-facet.component";
import { FilterCanActivateGuard } from "./facet/filter/filter-can-activate.guard";
import { FileLocationCopyComponent } from "./file-location/file-location-copy/file-location-copy.component";
import { FileLocationDownloadComponent } from "./file-location/file-location-download/file-location-download.component";
import { FileLocationService } from "./file-location/file-location.service";
import { FileManifestService } from "./file-manifest/file-manifest.service";
import { FilesComponent } from "./files.component";
import { routes } from "./files.routes";
import { FileTypeSummaryFormComponent } from "./file-type-summary-form/file-type-summary-form.component";
import { HCAContentEllipsisComponent } from "./hca-content-ellipsis/hca-content-ellipsis.component";
import { HCAEllipsisTextComponent } from "./hca-content-ellipsis/hca-ellipsis-text.component";
import { HCAContentUnspecifiedDashComponent } from "./hca-content-unspecified-bar/hca-content-unspecified-dash.component";
import { BulkDownloadComponent } from "./get-data/bulk-download/bulk-download.component";
import { BulkDownloadSpeciesFormComponent } from "./get-data/bulk-download-species-form/bulk-download-species-form.component";
import { DataLinkComponent } from "./get-data/data-link/data-link.component";
import { ExportToTerraComponent } from "./get-data/export-to-terra/export-to-terra.component";
import { ExecutionEnvironmentFormComponent } from "./get-data/excecution-environment-form/execution-environment-form.component";
import { ExportToTerraSpeciesFormComponent } from "./get-data/export-to-terra-species-form/export-to-terra-species-form.component";
import { ManifestDownloadFormatFormComponent } from "./get-data/export-to-terra/manifest-download-format-form/manifest-download-format-form.component";
import { GetDataComponent } from "./get-data/get-data.component";
import { GetDataLayoutComponent } from "./get-data/get-data-layout/get-data-layout.component";
import { GetDataOptionsComponent } from "./get-data/get-data-options/get-data-options.component";
import { GetDataPanelComponent } from "./get-data/get-data-panel/get-data-panel.component";
import { GetDataSummaryComponent } from "./get-data/get-data-summary/get-data-summary.component";
import { ManifestDownloadComponent } from "./get-data/manifest-download/manifest-download.component";
import { ManifestDownloadSpeciesFormComponent } from "./get-data/manifest-download-species-form/manifest-download-species-form.component";
import { SelectedDataSummaryComponent } from "./get-data/selected-data-summary/selected-data-summary.component";
import { SpeciesFormComponent } from "./get-data/species-form/species-form.component";
import { HCAFileSummaryComponent } from "./hca-file-summary/hca-file-summary.component";
import { HCASearchComponent } from "./hca-search/hca-search.component";
import { HCATableCellComponent } from "./hca-table-cell/hca-table-cell.component";
import { HCATableColumnHeaderComponent } from "./hca-table-column-header/hca-table-column-header.component";
import { HCATableColumnHeaderCountComponent } from "./hca-table-column-header-count/hca-table-column-header-count.component";
import { HCATableColumnHeaderDownloadComponent } from "./hca-table-column-header-download/hca-table-column-header-download.component";
import { HCATableColumnHeaderTitleComponent } from "./hca-table-column-header-title/hca-table-column-header-title.component";
import { HCATableDataStatusPlaceholderComponent } from "./hca-table-data-status-placeholder/hca-table-data-status-placeholder.component";
import { HCATableFilesComponent } from "./hca-table-files/hca-table-files.component";
import { HCATablePaginationComponent } from "./hca-table-pagination/hca-table-pagination.component";
import { HCATableProjectsComponent } from "./hca-table-projects/hca-table-projects.component";
import { HCATableSamplesComponent } from "./hca-table-samples/hca-table-samples.component";
import { HCATableSortComponent } from "./hca-table-sort/hca-table-sort.component";
import { ResponseTermService } from "./http/response-term.service";
import { HttpService } from "./http/http.service";
import { ModalModule } from "../modal/modal.module";
import { PipeModule } from "../pipe/pipe.module";
import { ProjectComponent } from "./project/project.component";
import { ProjectAccessionsComponent } from "./project-accessions/project-accessions.component";
import { ProjectAnalysisPortalComponent } from "./project-analysis-portal/project-analysis-portal.component";
import { ProjectAnalysisPortalsComponent } from "./project-analysis-portals/project-analysis-portals.component";
import { ProjectBulkDownloadComponent } from "./project-get-data/project-bulk-download/project-bulk-download.component";
import { ProjectDataCitationComponent } from "./project-data-citation/project-data-citation.component";
import { ProjectDeprecatedComponent } from "./project-deprecated/project-deprecated.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectDetailService } from "./project-detail/project-detail.service";
import { ProjectDownloadLayoutComponent } from "./project-get-data/project-download-layout/project-download-layout.component";
import { ProjectTerraExportComponent } from "./project-get-data/project-terra-export/project-terra-export.component";
import { ProjectFileTypeCountsComponent } from "./project-file-type-counts/project-file-type-counts.component";
import { ProjectManifestDownloadModalContainerComponent } from "./project-manifest-download-modal-container/project-manifest-download-modal-container.component";
import { ProjectManifestDownloadModalComponent } from "./project-manifest-download-modal/project-manifest-download-modal.component";
import { ProjectManifestDownloadComponent } from "./project-manifest-download/project-manifest-download.component";
import { ProjectDownloadsAndExportsComponent } from "./project-get-data/project-downloads-and-exports.component";
import { ProjectGuardComponent } from "./project-guard/project-guard.component";
import { ProjectIngestInProgressComponent } from "./project-ingest-in-progress/project-ingest-in-progress.component";
import { ProjectIntegrationsComponent } from "./project-integrations/project-integrations.component";
import { ProjectMatricesComponent } from "./project-matrices/project-matrices.component";
import { ProjectMatrixDownloadComponent } from "./project-matrix-download/project-matrix-download.component";
import { ProjectMatrixArchivePreviewComponent } from "./project-matrix-archive-preview/project-matrix-archive-preview.component";
import { ProjectMatrixDownloadModalComponent } from "./project-matrix-download-modal/project-matrix-download-modal.component";
import { ProjectMatrixDownloadModalContainerComponent } from "./project-matrix-download-modal-container/project-matrix-download-modal-container.component";
import { ProjectMatrixTableComponent } from "./project-matrix-table/project-matrix-table.component";
import { ProjectMetadataComponent } from "./project-metadata/project-metadata.component";
import { ProjectOverviewDataSummaryComponent } from "./project-overview-data-summary/project-overview-data-summary.component";
import { ProjectOverviewComponent } from "./project-overview/project-overview.component";
import { ProjectPortalsComponent } from "./project-portals/project-portals.component";
import { ProjectService } from "./project/project.service";
import { ProjectSpeciesFormComponent } from "./project-get-data/project-species-form/project-species-form.component";
import { ProjectSummaryStatsComponent } from "./project-summary-stats-component/project-summary-stats.component";
import { ProjectSupplementaryLinksComponent } from "./project-supplementary-links/project-supplementary-links.component";
import { ProjectViewFactory } from "./project-view/project-view.factory";
import { ProjectWithdrawnComponent } from "./project-withdrawn/project-withdrawn.component";
import { SearchTermHttpService } from "./search/http/search-term-http.service";
import { SelectedSearchTermsComponent } from "./search/selected-search-terms/selected-search-terms.component";
import { SearchTermUrlService } from "./search/url/search-term-url.service";
import { SectionBarComponent } from "./section-bar/section-bar.component";
import { FileNameShortenerPipe } from "./shared/file-name-shortener";
import { FilesService } from "./shared/files.service";
import { IntegrationService } from "./shared/integration.service";
import { ProjectEditsService } from "./shared/project-edits.service";
import { SharedModule } from "../shared/shared.module";
import { TerraService } from "./shared/terra.service";
import { TermSortService } from "./sort/term-sort.service";
import { SiteModule } from "../site/site.module";
import { SurveyModule } from "../survey/survey.module";
import { PaginationService } from "./table/pagination/pagination.service";
import { TableRendererService } from "./table/table-renderer.service";
import { TableScroll } from "./table-scroll/table-scroll.component";
import { TerraRegistrationComponent } from "./terra-registration/terra-registration.component";
import { TitleService } from "./title/title.service";
import { UrlService } from "./url/url.service";
import { WarningDataNormalizationComponent } from "./warning-data-normalization/warning-data-normalization.component";
import { ProjectManifestSpreadsheetComponent } from "./project-manifest-spreadsheet/project-manifest-spreadsheet.component";

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

        AuthModule,
        ModalModule,
        PipeModule,
        SharedModule,
        SiteModule,
        SurveyModule,
    ],
    declarations: [
        AgeInAgeUnit,
        AgeUnitInAgeUnit,
        AgeUnitInSeconds,
        AnalysisProtocolPipelineLinkerComponent,
        AnnouncementCatalogComponent,
        BaseManifestDownloadComponent,
        BulkDownloadComponent,
        BulkDownloadSpeciesFormComponent,
        CatalogFormComponent,
        CatalogUpdateChipComponent,
        DataLinkComponent,
        ExecutionEnvironmentFormComponent,
        ExportToTerraComponent,
        ExportToTerraSpeciesFormComponent,
        FacetAgeRangeFormComponent,
        FacetMenuComponent,
        FacetMenuOptionComponent,
        FacetMenuOptionContentComponent,
        FacetMenuOptionTitleComponent,
        FacetTermListComponent,
        FacetToolbarComponent,
        FileFacetComponent,
        FileLocationCopyComponent,
        FileLocationDownloadComponent,
        FileNameShortenerPipe,
        FileTypeSummaryFormComponent,
        FilesComponent,
        GetDataComponent,
        GetDataLayoutComponent,
        GetDataOptionsComponent,
        GetDataPanelComponent,
        GetDataSummaryComponent,
        HCAContentEllipsisComponent,
        HCAContentUnspecifiedDashComponent,
        HCAEllipsisTextComponent,
        HCAFileSummaryComponent,
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
        ManifestDownloadComponent,
        ManifestDownloadFormatFormComponent,
        ManifestDownloadSpeciesFormComponent,
        ProjectAccessionsComponent,
        ProjectAnalysisPortalsComponent,
        ProjectBulkDownloadComponent,
        ProjectComponent,
        ProjectTerraExportComponent,
        ProjectDataCitationComponent,
        ProjectDeprecatedComponent,
        ProjectDetailComponent,
        ProjectDownloadLayoutComponent,
        ProjectFileTypeCountsComponent,
        ProjectDownloadsAndExportsComponent,
        ProjectGuardComponent,
        ProjectAnalysisPortalComponent,
        ProjectIngestInProgressComponent,
        ProjectIntegrationsComponent,
        ProjectManifestDownloadComponent,
        ProjectManifestDownloadModalComponent,
        ProjectManifestDownloadModalContainerComponent,
        ProjectMatricesComponent,
        ProjectMatrixArchivePreviewComponent,
        ProjectMatrixDownloadComponent,
        ProjectMatrixDownloadModalComponent,
        ProjectMatrixDownloadModalContainerComponent,
        ProjectMatrixTableComponent,
        ProjectMetadataComponent,
        ProjectOverviewComponent,
        ProjectOverviewDataSummaryComponent,
        ProjectPortalsComponent,
        ProjectSpeciesFormComponent,
        ProjectManifestSpreadsheetComponent,
        ProjectSummaryStatsComponent,
        ProjectSupplementaryLinksComponent,
        ProjectWithdrawnComponent,
        SectionBarComponent,
        SelectedDataSummaryComponent,
        SelectedSearchTermsComponent,
        SpeciesFormComponent,
        TableScroll,
        TerraRegistrationComponent,
        WarningDataNormalizationComponent,
    ],
    providers: [
        CatalogCanActivateGuard,
        CatalogService,
        ConfigService,
        EntityRequestService,
        FacetDisplayService,
        FileLocationService,
        FileManifestService,
        FilesService,
        FilterCanActivateGuard,
        HttpService,
        IntegrationService,
        SearchTermUrlService,
        PaginationService,
        ProjectDetailService,
        ProjectService,
        ProjectEditsService,
        ProjectViewFactory,
        SearchTermHttpService,
        TableRendererService,
        ResponseTermService,
        TermSortService,
        TerraService,
        TitleService,
        UrlService,
        { provide: "Window", useValue: window }, // Required for hamburger functionality
    ],
    exports: [AnnouncementCatalogComponent, TerraRegistrationComponent],
})
export class FilesModule {}
