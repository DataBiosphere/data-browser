import { PlatformStudy } from "../../app/apis/catalog/ncpi-catalog/common/entities";
import { parseContentRows, readFile } from "../../app/utils/tsvParser";
import { writeAsJSON } from "../common/utils";
import { buildNCPICatalogPlatforms } from "./build-plaftorms";
import { buildNCPIPlatformStudies } from "./build-platform-studies";
import { SOURCE_FIELD_KEY, SOURCE_FIELD_TYPE, tsvPath } from "./constants";

console.log("Building NCPI Catalog Data");
export {};

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
  )) as PlatformStudy[];

  const ncpiPlatformStudies =
    await buildNCPIPlatformStudies(platformStudyStubs);

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

buildCatalog();
