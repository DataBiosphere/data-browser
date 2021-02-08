/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Complete set of effects for app.
 */

// App dependencies
import { CatalogEffects } from "../files/_ngrx/catalog/catalog.effects";
import { ConfigEffects } from "../config/_ngrx/config.effects";
import { AnalysisProtocolEffects } from "../files/_ngrx/analysis-protocol/analysis-protocol.effects";
import { EntityEffects } from "../files/_ngrx/entity/entity.effects";
import { ErrorEffects } from "../files/_ngrx/error/error.effects";
import { FileEffects } from "../files/_ngrx/file.effects";
import { FileManifestEffects } from "../files/_ngrx/file-manifest/file-manifest.effects";
import { InitEffects } from "../files/_ngrx/init/init.effects";
import { IntegrationEffects } from "../files/_ngrx/integration/integration.effects";
import { MatrixEffects } from "../files/_ngrx/matrix/matrix.effects";
import { ProjectEffects } from "../files/_ngrx/project/project.effects";
import { ProjectEditsEffects } from "../files/_ngrx/project-edits/project-edits.effects";
import { ReleaseEffects } from "../files/_ngrx/release/release.effects";
import { SearchEffects } from "../files/_ngrx/search/search.effects";
import { SupportRequestEffects } from "../support-request/_ngrx/support-request.effects";
import { SystemEffects } from "../system/_ngrx/system.effects";
import { TableEffects } from "../files/_ngrx/table/table.effects";
import { TerraEffects } from "../files/_ngrx/terra/terra.effects";
import { UrlEffects } from "../files/_ngrx/url/url.effects";

export const AppEffects = [
    AnalysisProtocolEffects,
    CatalogEffects,
    ConfigEffects,
    EntityEffects,
    ErrorEffects,
    FileEffects,
    FileManifestEffects,
    InitEffects,
    IntegrationEffects,
    MatrixEffects,
    ProjectEffects,
    ProjectEditsEffects,
    ReleaseEffects,
    SearchEffects,
    SupportRequestEffects,
    SystemEffects,
    TableEffects,
    TerraEffects,
    UrlEffects
];
