/**
 * Possible set of data summaries.
 */
export const enum DATA_SUMMARY {
  GENUS_SPECIES = "GENUS_SPECIES",
  PROJECT_SHORTNAME = "PROJECT_SHORTNAME",
}

/**
 * Display text for project data summaries.
 */
export const DATA_SUMMARY_DISPLAY_TEXT = {
  [DATA_SUMMARY.GENUS_SPECIES]: "Species",
  [DATA_SUMMARY.PROJECT_SHORTNAME]: "Project Label",
};
