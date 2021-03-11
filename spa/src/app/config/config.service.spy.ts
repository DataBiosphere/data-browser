/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spy for config service.
 */

export const ConfigServiceSpy = jasmine.createSpyObj("ConfigService", [
    "getAtlas",
    "getEntitiesUrl",
    "getFileManifestUrl",
    "getIndexStatusUrl",
    "getIntegrationsUrl",
    "getDataUrl",
    "getDefaultCatalog",
    "getMatrixUrl",
    "getMatrixFormatsUrl",
    "getMatrixRequestUrl",
    "getPortalUrl",
    "getProjectMetaUrl",
    "getProjectMetaDownloadUrl",
    "getProjectPreparedMatrixDownloadUrl",
    "getProjectUrl",
    "getTerraExportUrl",
    "getSummaryUrl",
    "initConfig",
    "isEnvCGLDev",
    "isEnvLocal",
    "isEnvUxDev",
    "isEnvDCP2",
    "isEnvProd",
    "isV2",
    "isCurrentVersion",
    "getZendeskUrl"
]);
