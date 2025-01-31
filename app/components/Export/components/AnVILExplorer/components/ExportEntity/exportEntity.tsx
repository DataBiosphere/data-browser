import { Filters } from "@databiosphere/findable-ui/lib/common/entities";
import { useFileManifest } from "@databiosphere/findable-ui/lib/hooks/useFileManifest/useFileManifest";

export interface ExportEntityProps {
  filters: Filters;
}

/**
 * Empty wrapper component that triggers calls to populate the selected data in the side channel. Required only
 * for choose export method functionality (as individual export methods trigger the required calls themsleves).
 * @param {Object} props - The properties object.
 * @param {ExportEntityProps} props.filters - The base filters for displaying the selected data related.
 * @returns Fragment.
 */
export const ExportEntity = ({ filters }: ExportEntityProps): JSX.Element => {
  useFileManifest(filters);
  return <></>;
};
