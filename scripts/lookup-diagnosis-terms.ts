/**
 * Refresh the names shown for diagnosis term IDs in the AnVIL Data Explorer.
 *
 * Fetches the term IDs in the AnVIL Azul diagnosis facets, names them from the
 * Human Phenotype Ontology and Orphadata release files, and writes
 * site-config/anvil-cmg/dev/index/common/diagnosis.ts. IDs that could not be
 * named are listed at the end of the run.
 *
 * Run with `npm run refresh-diagnosis-terms:anvil-cmg`. See "Refresh diagnosis
 * term names" in README.md for when to re-run and how to check the result.
 */
import { promises as fsp } from "fs";
import path from "path";
import prettier from "prettier";
import { DIAGNOSIS_DISPLAY_VALUE } from "../site-config/anvil-cmg/dev/index/common/diagnosis";
import {
  extractTermIds,
  findEmptySources,
  findUnnamedIds,
  generateLookupModule,
  parseHpoa,
  parseHpObo,
  parseOrphadata,
  parseSourceVersions,
} from "./lookup-diagnosis-terms/utils";

const AZUL_URL =
  "https://service.explore.anvilproject.org/index/datasets?size=1&filters=%7B%7D";
const HP_OBO_URL =
  "https://github.com/obophenotype/human-phenotype-ontology/releases/latest/download/hp.obo";
const HPOA_URL =
  "https://github.com/obophenotype/human-phenotype-ontology/releases/latest/download/phenotype.hpoa";
const ORPHADATA_URL = "https://www.orphadata.com/data/xml/en_product1.xml";
// Resolved from this script's location (esrun sets __dirname), so the script
// works from any directory.
const OUTPUT_PATH = path.resolve(
  __dirname,
  "../site-config/anvil-cmg/dev/index/common/diagnosis.ts"
);
// The largest download (~54 MB) normally takes about 10 seconds.
const FETCH_TIMEOUT_MS = 120_000;

async function fetchText(url: string): Promise<string> {
  try {
    // The timeout covers both the response and reading its body.
    const resp = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!resp.ok) throw new Error(`Failed to fetch ${url}: ${resp.status}`);
    return await resp.text();
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw new Error(
        `Timed out after ${FETCH_TIMEOUT_MS / 1000}s fetching ${url}`
      );
    }
    throw err;
  }
}

async function main(): Promise<void> {
  console.log("Fetching term IDs from the AnVIL Azul API...");
  const { termFacets } = JSON.parse(await fetchText(AZUL_URL));
  // Keep the IDs already in the lookup; their names are looked up again below.
  const existingIds = Object.keys(DIAGNOSIS_DISPLAY_VALUE);
  const ids = extractTermIds(termFacets ?? {}, existingIds);
  console.log(
    `  Found ${ids.hp.size} HP, ${ids.omim.size} OMIM and ${ids.orphanet.size} Orphanet IDs, including the ${existingIds.length} already in ${OUTPUT_PATH}`
  );

  console.log("Downloading hp.obo, phenotype.hpoa and en_product1.xml...");
  const [hpObo, hpoa, orphadata] = await Promise.all([
    fetchText(HP_OBO_URL),
    fetchText(HPOA_URL),
    fetchText(ORPHADATA_URL),
  ]);

  const hpNames = parseHpObo(hpObo, ids.hp);
  const omimNames = parseHpoa(hpoa, ids.omim);
  const orphanetNames = parseOrphadata(orphadata, ids.orphanet);

  // A source that gives no names at all means a failed download or a changed
  // format; stop rather than write a lookup missing every name from it.
  const emptySources = findEmptySources({
    [HPOA_URL]: { ids: ids.omim, names: omimNames },
    [HP_OBO_URL]: { ids: ids.hp, names: hpNames },
    [ORPHADATA_URL]: { ids: ids.orphanet, names: orphanetNames },
  });
  if (emptySources.length > 0) {
    throw new Error(
      `No names found in ${emptySources.join(", ")}. The download may have failed or the file format may have changed. ${OUTPUT_PATH} was not changed.`
    );
  }

  const mapping = new Map<string, string>([
    ...hpNames,
    ...omimNames,
    ...orphanetNames,
  ]);
  const versions = parseSourceVersions({ hpObo, hpoa, orphadata });

  const source = generateLookupModule(mapping, versions);
  const options = await prettier.resolveConfig(OUTPUT_PATH);
  const formatted = await prettier.format(source, {
    ...options,
    filepath: OUTPUT_PATH,
  });
  // This script imports the file it writes, so a half-written file would stop
  // both the app build and the next refresh. Write a temp file next to it and
  // rename it into place, which replaces the file in one step.
  const tempPath = `${OUTPUT_PATH}.tmp`;
  await fsp.writeFile(tempPath, formatted);
  await fsp.rename(tempPath, OUTPUT_PATH);
  console.log(`\nWrote ${mapping.size} names to ${OUTPUT_PATH}`);

  const unnamed = findUnnamedIds(ids, mapping);
  if (unnamed.size === 0) {
    console.log("Every term ID has a name.");
    return;
  }
  console.log(
    "\nThese term IDs have no name and will show as raw IDs. HP, OMIM and Orphanet IDs here are missing from the source files; other prefixes (e.g. MONDO) are not looked up:"
  );
  for (const [prefix, prefixIds] of unnamed) {
    console.log(`  ${prefix} (${prefixIds.length}): ${prefixIds.join(", ")}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
