import { parseContentRows, readFile } from "../../app/utils/tsvParser";
import { DbGapStudy, getStudy } from "../common/dbGaP";
import { writeAsJSON } from "../common/utils";
import { buildNCPICatalogPlatforms } from "./build-plaftorms";

console.log("Building NCPI Catalog Data");
export {};

const tsvPath = "ncpi-catalog/files/dashboard-source-ncpi.tsv";

const SOURCE_HEADER_KEY = {
  DB_GAP_ID: "identifier",
  PLATFORM: "platform",
};
const SOURCE_FIELD_KEY = {
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "dbGapId",
  [SOURCE_HEADER_KEY.PLATFORM]: "platform",
};
const SOURCE_FIELD_TYPE = {
  [SOURCE_HEADER_KEY.DB_GAP_ID]: "string",
  [SOURCE_HEADER_KEY.PLATFORM]: "string",
};

export interface NCPIPlatformStudyStub {
  dbGapId: string;
  platform: string;
}

export interface NCPIStudy extends DbGapStudy {
  platforms: string[];
}

/**
 * Returns the NCPI dashboard studies.
 * @returns void
 */
async function buildCatalog(): Promise<void> {
  const file = await readFile(tsvPath);
  if (!file) {
    throw new Error(`File ${tsvPath} not found`);
  }

  const platformStudyStubs = (await parseContentRows(
    file,
    "\t",
    SOURCE_FIELD_KEY,
    SOURCE_FIELD_TYPE
  )) as NCPIPlatformStudyStub[];

  const ncpiPlatformStudies = await buildNCPIPlatformStudies(
    platformStudyStubs
  );

  const ncpiCatalogPlatforms = buildNCPICatalogPlatforms(ncpiPlatformStudies);

  await writeAsJSON(
    "ncpi-catalog/out/ncpi-platform-studies.json",
    Object.fromEntries(ncpiPlatformStudies.entries())
  );

  await writeAsJSON(
    "ncpi-catalog/out/ncpi-platforms.json",
    Object.fromEntries(ncpiCatalogPlatforms.entries())
  );
}

export async function buildNCPIPlatformStudies(
  platformStudyStubs: NCPIPlatformStudyStub[]
): Promise<NCPIStudy[]> {
  const ncpiStudies: NCPIStudy[] = [];

  // build workspaces
  for (const stub of platformStudyStubs) {
    const study = await getStudy(stub.dbGapId);
    /* Continue when the study is incomplete. */

    if (!study || !isStudyFieldsComplete(study)) {
      continue;
    }
    const ncpiStudy = {
      ...study,
      platforms: [stub.platform],
    };

    ncpiStudies.push(ncpiStudy);
    console.log(ncpiStudy.dbGapId, ncpiStudy.title);
  }
  return ncpiStudies;
}

/**
 * Returns true if the study has a valid study name and subjects total.
 *
 * @param study - a dbGaP study
 * @returns true if the study is "complete" meaning it has at least a title and subjects
 */
function isStudyFieldsComplete(study: DbGapStudy): boolean {
  return !!(study.title && study.participantCount);
}

buildCatalog();
