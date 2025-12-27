import { FileManifestDownload } from "@databiosphere/findable-ui/lib/components/Export/components/ManifestDownload/components/ManifestDownloadEntity/components/FileManifestDownload/fileManifestDownload";
import { ManifestDownloadEntityProps } from "@databiosphere/findable-ui/lib/components/Export/components/ManifestDownload/components/ManifestDownloadEntity/manifestDownloadEntity";
import { useFileManifest } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/useFileManifest";
import { JSX } from "react";

export const ManifestDownloadEntity = ({
  filters,
}: Pick<ManifestDownloadEntityProps, "filters">): JSX.Element => {
  useFileManifest(filters);
  return <FileManifestDownload filters={filters} />;
};
