import { stringify } from "csv-stringify/sync";
import fs from "fs";
import {
  DbGapId,
  PlatformStudy,
} from "../../app/apis/catalog/ncpi-catalog/common/entities";
import { parseContentRows, readFile } from "../../app/utils/tsvParser";
import { Platform, SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE } from "./constants";

export const sourcePath = "ncpi-catalog/files/dashboard-source-ncpi.tsv";

export function replaceTsv(path: string, data: string[][]): void {
  const stringifiedOut = stringify(data, { delimiter: "\t" });

  fs.writeFileSync(path, stringifiedOut);
  console.log("Source updated!");
}

export function mergeSourceStudies(
  sourceStudies: PlatformStudy[],
  platform: Platform,
  dbGapIds: DbGapId[]
): string[][] {
  const newStudyRows = dbGapIds.map((id) => [platform, id]);
  const unrelatedStudyRows = sourceStudies
    .filter((study) => study.platform !== platform)
    .map((study) => [study.platform, study.dbGapId]);
  return unrelatedStudyRows.concat(newStudyRows).sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0].localeCompare(b[0]);
    }
    return parseInt(a[1].split("phs")[1]) - parseInt(b[1].split("phs")[1]);
  });
}

export function addNCPIHeader(rows: string[][]): string[][] {
  return [[SOURCE_FIELD_KEY.platform, SOURCE_FIELD_KEY.identifier]].concat(
    rows
  );
}

/**
 * Returns platform studies and study identifiers for the specified platform.
 * @param sourcePath - NCPI source tsv pathname.
 * @param platform - Platform.
 * @returns tuple containing platform studies and study identifiers.
 */
export async function getPlatformStudiesStudyIds(
  sourcePath: string,
  platform: Platform
): Promise<[PlatformStudy[], string[]]> {
  const file = await readFile(sourcePath);
  if (!file) {
    throw new Error(`File ${sourcePath} not found`);
  }
  // Get the platform studies.
  const platformStudies = (await parseContentRows(
    file,
    "\t",
    SOURCE_FIELD_KEY,
    SOURCE_FIELD_TYPE
  )) as PlatformStudy[];
  // Get the study ids for the platform.
  const studyIds = platformStudies
    .filter((study) => study.platform === platform)
    .map(({ dbGapId }) => dbGapId);
  return [platformStudies, studyIds];
}

export function reportStudyResults(ids: DbGapId[]): void {
  console.log(
    `${ids.length} entries added, dbGap ids (if any) follow:\n${ids.join("\n")}`
  );
}

/**
 * Update platform studies and report new studies for the specified platform.
 * @param platform - Platform.
 * @param platformStudies - Platform studies.
 * @param studyIds - Study ids for the platform.
 * @param currentStudyIds - Current study ids for the platform.
 * @param sourcePath - File path to write platform studies.
 */
export function updatePlatformStudiesAndReportNewStudies(
  platform: Platform,
  platformStudies: PlatformStudy[],
  studyIds: string[],
  currentStudyIds: string[],
  sourcePath: string
): void {
  // Get new study ids.
  const newStudyIds = studyIds.filter((id) => !currentStudyIds.includes(id));
  // Update spreadsheet (all studies will be replaced).
  const newPlatformStudies = mergeSourceStudies(
    platformStudies,
    platform,
    studyIds
  );
  replaceTsv(sourcePath, addNCPIHeader(newPlatformStudies));
  // Report new studies.
  reportStudyResults(newStudyIds);
}
