import { MANIFEST_DOWNLOAD_FORMAT } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { FileManifestDownload } from "@databiosphere/findable-ui/lib/components/Export/components/ManifestDownload/components/ManifestDownloadEntity/components/FileManifestDownload/fileManifestDownload";
import { ManifestDownloadEntityProps } from "@databiosphere/findable-ui/lib/components/Export/components/ManifestDownload/components/ManifestDownloadEntity/manifestDownloadEntity";
import { FILE_MANIFEST_TYPE } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/common/entities";
import { useRequestFileManifest } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/useRequestFileManifest";

export const ManifestDownloadEntity = ({
  filters,
}: Omit<
  ManifestDownloadEntityProps,
  "fileManifestType" | "metadataFilters"
>): JSX.Element => {
  useRequestFileManifest(
    FILE_MANIFEST_TYPE.ENTITY_DOWNLOAD_MANIFEST,
    MANIFEST_DOWNLOAD_FORMAT.COMPACT,
    filters,
    undefined
  );
  return (
    <>
      <FileManifestDownload filters={filters} />
    </>
  );
};
