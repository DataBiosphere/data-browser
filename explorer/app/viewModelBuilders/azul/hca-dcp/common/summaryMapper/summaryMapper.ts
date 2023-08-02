import {
  displaySummaryTerms,
  listSelectedTermsOfFacet,
} from "@clevercanary/data-explorer-ui/lib/components/Export/components/ExportSummary/common/utils";
import { FileFacet } from "@clevercanary/data-explorer-ui/lib/hooks/useFileManifest/common/entities";
import { formatCountSize } from "@clevercanary/data-explorer-ui/lib/utils/formatCountSize";
import { formatFileSize } from "@clevercanary/data-explorer-ui/lib/utils/formatFileSize";
import { HCA_DCP_CATEGORY_KEY } from "../../../../../../site-config/hca-dcp/category";
import { SummaryResponse } from "../../../../../apis/azul/hca-dcp/common/responses";
import { DEFAULT_SUMMARY } from "./constants";
import { FileSummary, SUMMARY } from "./entities";

/**
 * Calculate the summary total cell count using the projects and estimatedCellCount values returned in the response.
 * @param summaryResponse - Response model return from summary API.
 * @returns summary total cell count.
 */
function calculateSummaryTotalCellCount(
  summaryResponse: SummaryResponse
): number {
  return (summaryResponse.projects ?? []).reduce(
    (accum, { cellSuspensions, projects }) => {
      if (
        projects &&
        (projects.estimatedCellCount || projects.estimatedCellCount === 0)
      ) {
        accum += projects.estimatedCellCount;
      } else if (
        cellSuspensions &&
        (cellSuspensions.totalCells || cellSuspensions.totalCells === 0)
      ) {
        accum += cellSuspensions.totalCells;
      }
      return accum;
    },
    0
  );
}

/**
 * Create a new file summary object (to trigger change detecting) from the file summary response, and fix erroneous
 * total file size count if applicable.
 * @param summaryResponse - Response model return from summary API.
 * @returns file summary.
 */
export function bindFileSummaryResponse(
  summaryResponse?: SummaryResponse
): FileSummary {
  if (!summaryResponse) {
    return DEFAULT_SUMMARY;
  }
  const totalFileSize =
    typeof summaryResponse.totalFileSize === "string"
      ? 0
      : summaryResponse.totalFileSize;
  // Calculate total cell count (as per Azul 3521).
  const totalCellCount = calculateSummaryTotalCellCount(summaryResponse);
  return {
    donorCount: summaryResponse.donorCount,
    fileCount: summaryResponse.fileCount,
    fileTypeSummaries: summaryResponse.fileTypeSummaries.map(
      (fileTypeSummaryResponse) => {
        return {
          count: fileTypeSummaryResponse.count,
          fileType: fileTypeSummaryResponse.format,
          matrixCellCount: fileTypeSummaryResponse.matrixCellCount,
          totalSize: fileTypeSummaryResponse.totalSize,
        };
      }
    ),
    organTypes: summaryResponse.organTypes,
    projectCount: summaryResponse.projectCount,
    specimenCount: summaryResponse.specimenCount,
    totalCellCount,
    totalFileSize: totalFileSize,
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
): Map<SUMMARY | string, string> {
  const fileSummary = bindFileSummaryResponse(summary);
  // Grab summary values.
  const donorCount = fileSummary.donorCount;
  const donorDisease = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.DONOR_DISEASE
  );
  const fileCount = fileSummary.fileCount;
  const genusSpecies = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.GENUS_SPECIES
  );
  const libraryConstructionApproach = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD
  );
  const organ = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.ORGAN
  );
  const organPart = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.ORGAN_PART
  );
  const pairedEnd = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.PAIRED_END
  );
  const projectCount = fileSummary.projectCount;
  const specimenCount = fileSummary.specimenCount;
  const specimenDisease = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE
  );
  const totalCellCount = fileSummary.totalCellCount;
  const totalFileSize = fileSummary.totalFileSize;

  // Map summary by summary key or display text.
  const summaryBySummaryKey = new Map<SUMMARY | string, string>();
  summaryBySummaryKey.set(
    SUMMARY.TOTAL_CELL_COUNT,
    formatCountSize(totalCellCount)
  ); // Estimated Cells
  summaryBySummaryKey.set(
    SUMMARY.TOTAL_FILE_SIZE,
    formatFileSize(totalFileSize)
  );
  summaryBySummaryKey.set(SUMMARY.FILE_COUNT, formatCountSize(fileCount));
  summaryBySummaryKey.set(SUMMARY.PROJECT_COUNT, formatCountSize(projectCount));
  summaryBySummaryKey.set(
    SUMMARY.GENUS_SPECIES,
    displaySummaryTerms(genusSpecies)
  );
  summaryBySummaryKey.set(SUMMARY.DONOR_COUNT, formatCountSize(donorCount));
  summaryBySummaryKey.set(
    SUMMARY.DONOR_DISEASE,
    displaySummaryTerms(donorDisease)
  ); // Disease Status (Donor)
  summaryBySummaryKey.set(
    SUMMARY.SPECIMEN_COUNT,
    formatCountSize(specimenCount)
  );
  summaryBySummaryKey.set(
    SUMMARY.SPECIMEN_DISEASE,
    displaySummaryTerms(specimenDisease)
  ); // Disease Status (Specimen)
  summaryBySummaryKey.set(SUMMARY.ORGAN, displaySummaryTerms(organ)); // Anatomical Entity
  summaryBySummaryKey.set(SUMMARY.ORGAN_PART, displaySummaryTerms(organPart));
  summaryBySummaryKey.set(
    SUMMARY.LIBRARY_CONSTRUCTION_APPROACH,
    displaySummaryTerms(libraryConstructionApproach)
  ); // Library Construction Method
  summaryBySummaryKey.set(SUMMARY.PAIRED_END, displaySummaryTerms(pairedEnd)); // Paired End
  return summaryBySummaryKey;
}
