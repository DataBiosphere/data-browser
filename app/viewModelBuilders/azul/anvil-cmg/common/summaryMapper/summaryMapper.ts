import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { listSelectedTermsOfFacet } from "@databiosphere/findable-ui/lib/components/Export/components/ExportSummary/common/utils";
import { SummaryValue } from "@databiosphere/findable-ui/lib/components/Export/components/ExportSummary/components/ExportSelectedDataSummary/exportSelectedDataSummary";
import { NTagCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/NTagCell/nTagCell";
import {
  FileFacet,
  Term,
} from "@databiosphere/findable-ui/lib/hooks/useFileManifest/common/entities";
import { formatCountSize } from "@databiosphere/findable-ui/lib/utils/formatCountSize";
import { ANVIL_CMG_CATEGORY_KEY } from "../../../../../../site-config/anvil-cmg/category";
import { SummaryResponse } from "../../../../../apis/azul/anvil-cmg/common/responses";
import { METADATA_KEY } from "../../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../../components/Index/common/indexTransformer";
import { DEFAULT_SUMMARY } from "./constants";
import { FileSummary, SUMMARY } from "./entities";

/**
 * Returns the summary response file formats, sorted alphabetically.
 * @param summaryResponse - Response model return from summary API.
 * @returns a list of file formats.
 */
export function bindFileFormatSummaryResponse(
  summaryResponse?: SummaryResponse
): string[] {
  if (!summaryResponse || summaryResponse.fileFormats.length === 0) {
    return DEFAULT_SUMMARY.fileFormats;
  }
  return summaryResponse.fileFormats.map(({ format }) => format).sort();
}

/**
 * Create a new file summary object from the file summary response.
 * @param summaryResponse - Response model return from summary API.
 * @returns file summary.
 */
export function bindFileSummaryResponse(
  summaryResponse?: SummaryResponse
): FileSummary {
  if (!summaryResponse) {
    return DEFAULT_SUMMARY;
  }
  return {
    biosampleCount: summaryResponse.biosampleCount,
    donorCount: summaryResponse.donorCount,
    fileCount: summaryResponse.fileCount,
    fileFormats: bindFileFormatSummaryResponse(summaryResponse),
  };
}

/**
 * Maps export summary related information, included formatted display text from the given file manifest.
 * @param filesFacets - Files facets.
 * @param summary - Response model return from summary API.
 * @returns summaries key-value pairs of data summary and corresponding value.
 */
export function mapExportSummary(
  filesFacets: FileFacet[],
  summary: SummaryResponse | undefined
): Map<SUMMARY, SummaryValue> {
  const fileSummary = bindFileSummaryResponse(summary);
  // Grab summary values.
  const biosampleCount = fileSummary.biosampleCount;
  const donorCount = fileSummary.donorCount;
  const fileCount = fileSummary.fileCount;
  const fileFormats = fileSummary.fileFormats;
  const organismType = listSelectedTermsOfFacet(
    filesFacets,
    ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE
  );
  // Map summary by summary key or display text.
  const summaryBySummaryKey = new Map<SUMMARY, SummaryValue>();
  summaryBySummaryKey.set(
    SUMMARY.BIOSAMPLE_COUNT,
    formatCountSize(biosampleCount)
  ); // BioSamples
  summaryBySummaryKey.set(SUMMARY.DONOR_COUNT, formatCountSize(donorCount)); // Donors
  summaryBySummaryKey.set(
    SUMMARY.ORGANISM_TYPE,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.ORGANISM_TYPE),
      values: getTermValues(organismType),
    })
  ); // Organism Types
  summaryBySummaryKey.set(SUMMARY.FILE_COUNT, formatCountSize(fileCount)); // Files
  summaryBySummaryKey.set(
    SUMMARY.FILE_FORMATS,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.FILE_FORMAT),
      values: fileFormats,
    })
  ); // Formats
  return summaryBySummaryKey;
}

/**
 * Returns term values from the given terms.
 * @param terms - Terms.
 * @returns term values.
 */
function getTermValues(terms: Term[]): string[] {
  if (!terms || !terms.length) {
    return [LABEL.UNSPECIFIED];
  }
  return terms.map(({ name }) => name.trim());
}
