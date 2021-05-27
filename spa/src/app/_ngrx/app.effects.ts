/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Complete set of effects for app.
 */

// App dependencies
import { AnalysisProtocolEffects } from "../files/_ngrx/analysis-protocol/analysis-protocol.effects";
import { CatalogEffects } from "../files/_ngrx/catalog/catalog.effects";
import { CohortManifestEffects } from "../files/_ngrx/cohort-manifest/cohort-manifest.effects";
import { ConfigEffects } from "../config/_ngrx/config.effects";
import { EntityEffects } from "../files/_ngrx/entity/entity.effects";
import { ErrorEffects } from "../files/_ngrx/error/error.effects";
import { FileEffects } from "../files/_ngrx/file/file.effects";
import { FilesEffects } from "../files/_ngrx/files.effects";
import { FileManifestEffects } from "../files/_ngrx/file-manifest/file-manifest.effects";
import { GetDataEffects } from "../files/_ngrx/get-data/get-data.effects";
import { InitEffects } from "../files/_ngrx/init/init.effects";
import { IntegrationEffects } from "../files/_ngrx/integration/integration.effects";
import { ProjectEffects } from "../files/_ngrx/project/project.effects";
import { ProjectEditsEffects } from "../files/_ngrx/project-edits/project-edits.effects";
import { SearchEffects } from "../files/_ngrx/search/search.effects";
import { SystemEffects } from "../system/_ngrx/system.effects";
import { TableEffects } from "../files/_ngrx/table/table.effects";
import { TerraEffects } from "../files/_ngrx/terra/terra.effects";
import { UrlEffects } from "../files/_ngrx/url/url.effects";

export const AppEffects = [
    AnalysisProtocolEffects,
    CatalogEffects,
    CohortManifestEffects,
    ConfigEffects,
    EntityEffects,
    ErrorEffects,
    FileEffects,
    FilesEffects,
    FileManifestEffects,
    GetDataEffects,
    InitEffects,
    IntegrationEffects,
    ProjectEffects,
    ProjectEditsEffects,
    SearchEffects,
    SystemEffects,
    TableEffects,
    TerraEffects,
    UrlEffects
];
