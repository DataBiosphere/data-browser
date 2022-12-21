import { parseContentRows, readFile } from "../../app/utils/tsvParser";
import { writeAsJSON } from "../common/utils";
import { buildNCPIPlatformStudies } from "../ncpi-catalog/build-platform-studies";
import {
  SOURCE_FIELD_KEY,
  SOURCE_FIELD_TYPE,
  tsvPath,
} from "../ncpi-catalog/constants";
import { NCPIPlatformStudy } from "../ncpi-catalog/entities";
import { buildNCPIDugCatalogStudies } from "./build-studies";

console.log("Building NCPI Catalog Dug Data");
export {};

/**
 * Builds the NCPI Catalog Dug studies.
 * @returns void
 */
async function buildCatalog(): Promise<void> {
  const file = await readFile(tsvPath);
  if (!file) {
    throw new Error(`File ${tsvPath} not found`);
  }

  const platformStudies = (await parseContentRows(
    file,
    "\t",
    SOURCE_FIELD_KEY,
    SOURCE_FIELD_TYPE
  )) as NCPIPlatformStudy[];

  const ncpiPlatformStudies = await buildNCPIPlatformStudies(platformStudies);

  const ncpiDugCatalogStudies = await buildNCPIDugCatalogStudies(
    ncpiPlatformStudies
  );

  await writeAsJSON(
    "ncpi-catalog-dug/out/ncpi-dug-studies.json",
    Object.fromEntries(ncpiDugCatalogStudies.entries())
  );
}

buildCatalog();
