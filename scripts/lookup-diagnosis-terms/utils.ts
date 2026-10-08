/**
 * Pure helpers for scripts/lookup-diagnosis-terms.ts. They take the text of the
 * Azul facets and the source files and return results, with no network or file
 * access, so they can be unit tested.
 */

/**
 * Term IDs found in the Azul diagnosis facets, grouped by how they are named.
 * Orphanet IDs keep the spelling Azul uses (`ORPHA:` or `Orphanet:`), because
 * the UI looks up the facet value exactly as Azul returns it.
 */
export interface TermIds {
  hp: Set<string>;
  omim: Set<string>;
  orphanet: Set<string>;
  // ID-like values the script does not name, e.g. MONDO or malformed HP IDs.
  other: Set<string>;
}

/**
 * Release versions of the source files, recorded in the generated file.
 */
interface SourceVersions {
  hpo?: string;
  hpoa?: string;
  orphadata?: string;
}

/**
 * Shape of an Azul term facet, as returned in `termFacets` of an index response.
 */
interface TermFacet {
  terms?: { term: string | null }[];
}

const FACET_KEYS = ["diagnoses.disease", "diagnoses.phenotype"];

const HP_ID = /^HP:\d{7}$/;
const OMIM_ID = /^OMIM:\d{6}$/;
const ORPHANET_ID = /^(ORPHA|Orphanet):(\d+)$/;
// A prefix followed by a colon and no whitespace, e.g. "MONDO:0005148" or "H:0010609".
const ID_LIKE = /^[A-Za-z]+:\S+$/;

/**
 * Collect the term IDs in the diagnosis facets, plus any extra IDs, grouped by
 * prefix. Values that are labels rather than IDs (e.g. "Abdominal pain") are
 * ignored.
 *
 * The extra IDs are the ones already in the lookup. Azul keeps at most 100
 * diagnosis values per dataset, so an ID can drop out of the datasets facets
 * while still appearing on other tabs; keeping these IDs stops a refresh from
 * removing names that are still needed.
 * @param termFacets - The `termFacets` object of an Azul index response.
 * @param extraIds - IDs to include whether or not they are in the facets.
 * @returns term IDs grouped by prefix.
 */
export function extractTermIds(
  termFacets: Record<string, TermFacet | undefined>,
  extraIds: string[] = []
): TermIds {
  const ids: TermIds = {
    hp: new Set(),
    omim: new Set(),
    orphanet: new Set(),
    other: new Set(),
  };
  const values = [...extraIds];
  for (const key of FACET_KEYS) {
    for (const { term } of termFacets[key]?.terms ?? []) {
      // Some values hold several IDs separated by semicolons.
      if (term) values.push(...term.split(";").map((part) => part.trim()));
    }
  }
  for (const value of values) {
    if (HP_ID.test(value)) ids.hp.add(value);
    else if (OMIM_ID.test(value)) ids.omim.add(value);
    else if (ORPHANET_ID.test(value)) ids.orphanet.add(value);
    else if (ID_LIKE.test(value)) ids.other.add(value);
  }
  return ids;
}

/**
 * Name HP IDs from hp.obo. IDs listed as `alt_id` (retired or merged IDs) get
 * the name of the term they belong to, and an "obsolete" prefix is removed.
 * @param obo - Text of hp.obo.
 * @param hpIds - HP IDs to name.
 * @returns map of HP ID to name.
 */
export function parseHpObo(
  obo: string,
  hpIds: Set<string>
): Map<string, string> {
  const names = new Map<string, string>();
  let id: string | null = null;
  let name: string | null = null;
  let altIds: string[] = [];

  const save = (): void => {
    if (!id || !name) return;
    for (const termId of [id, ...altIds]) {
      if (hpIds.has(termId)) names.set(termId, name);
    }
  };

  for (const line of obo.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("[")) {
      // A new stanza ([Term], [Typedef]) ends the previous one.
      save();
      id = null;
      name = null;
      altIds = [];
    } else if (trimmed.startsWith("id: HP:")) {
      id = trimmed.slice(4);
    } else if (trimmed.startsWith("name: ") && id) {
      name = trimmed.slice(6).replace(/^obsolete\s+/, "");
    } else if (trimmed.startsWith("alt_id: HP:")) {
      altIds.push(trimmed.slice(8));
    }
  }
  save();
  return names;
}

/**
 * Name OMIM IDs from phenotype.hpoa, which lists each disease once per
 * annotation. The first name seen for an ID is kept.
 * @param hpoa - Text of phenotype.hpoa.
 * @param omimIds - OMIM IDs to name.
 * @returns map of OMIM ID to name.
 */
export function parseHpoa(
  hpoa: string,
  omimIds: Set<string>
): Map<string, string> {
  const names = new Map<string, string>();
  for (const line of hpoa.split("\n")) {
    if (line.startsWith("#") || line.startsWith("database_id")) continue;
    const [databaseId, diseaseName] = line.split("\t", 2);
    const id = databaseId?.trim();
    const name = diseaseName?.trim();
    if (id && name && omimIds.has(id) && !names.has(id)) names.set(id, name);
  }
  return names;
}

/**
 * Name Orphanet IDs from Orphadata's disease list (en_product1.xml). Both
 * `ORPHA:` and `Orphanet:` spellings are named, keyed as Azul spells them.
 * @param xml - Text of en_product1.xml.
 * @param orphanetIds - Orphanet IDs to name.
 * @returns map of Orphanet ID to name.
 */
export function parseOrphadata(
  xml: string,
  orphanetIds: Set<string>
): Map<string, string> {
  // Group the requested IDs by their numeric Orpha code.
  const idsByCode = new Map<string, string[]>();
  for (const id of orphanetIds) {
    const code = ORPHANET_ID.exec(id)?.[2];
    if (code) pushTo(idsByCode, code, id);
  }

  const names = new Map<string, string>();
  // Each disease is a <Disorder> element. Its own <Name> is the first one after
  // its <OrphaCode>; later <Name>s belong to nested elements such as
  // <DisorderType>.
  for (const disorder of xml.split("<Disorder ").slice(1)) {
    const code = /<OrphaCode>(\d+)<\/OrphaCode>/.exec(disorder)?.[1];
    const ids = code && idsByCode.get(code);
    if (!ids) continue;
    const name = /<Name lang="en">([^<]*)<\/Name>/.exec(disorder)?.[1];
    if (!name) continue;
    for (const id of ids) names.set(id, decodeXmlEntities(name.trim()));
  }
  return names;
}

/**
 * Read the release versions from the source files' headers.
 * @param sources - Text of the source files.
 * @param sources.hpObo - Text of hp.obo.
 * @param sources.hpoa - Text of phenotype.hpoa.
 * @param sources.orphadata - Text of en_product1.xml.
 * @returns source versions.
 */
export function parseSourceVersions(sources: {
  hpObo: string;
  hpoa: string;
  orphadata: string;
}): SourceVersions {
  // Versions are written into a comment in the generated file, so only accept
  // plain version strings; anything else (e.g. containing "*/") is left out.
  return {
    hpo: /^data-version: ([\w./-]+)\s*$/m.exec(sources.hpObo)?.[1],
    hpoa: /^#version: ([\w./-]+)\s*$/m.exec(sources.hpoa)?.[1],
    orphadata: /<JDBOR date="(\d{4}-\d{2}-\d{2})/.exec(sources.orphadata)?.[1],
  };
}

/**
 * List the sources that gave no names even though IDs of their type were
 * requested. That means the download failed or the file format changed, and
 * writing the lookup would drop every name from that source.
 * @param sources - Requested IDs and the names found, by source name.
 * @returns names of the sources that gave no names.
 */
export function findEmptySources(
  sources: Record<string, { ids: Set<string>; names: Map<string, string> }>
): string[] {
  return Object.entries(sources)
    .filter(([, { ids, names }]) => ids.size > 0 && names.size === 0)
    .map(([source]) => source);
}

/**
 * List the term IDs that have no name, grouped by prefix, for the run report.
 * @param ids - Term IDs found in the facets.
 * @param mapping - Map of term ID to name.
 * @returns map of prefix to sorted unnamed IDs, sorted by prefix.
 */
export function findUnnamedIds(
  ids: TermIds,
  mapping: Map<string, string>
): Map<string, string[]> {
  const unnamed = new Map<string, string[]>();
  const all = [...ids.hp, ...ids.omim, ...ids.orphanet, ...ids.other];
  // Sorting the IDs also sorts the prefixes, in the order they are first added.
  for (const id of all.sort()) {
    if (!mapping.has(id)) pushTo(unnamed, id.split(":")[0], id);
  }
  return unnamed;
}

/**
 * Generate the TypeScript module that maps term IDs to names.
 * @param mapping - Map of term ID to name.
 * @param versions - Release versions of the source files.
 * @returns module source.
 */
export function generateLookupModule(
  mapping: Map<string, string>,
  versions: SourceVersions
): string {
  const version = (v?: string): string => (v ? ` (${v})` : "");
  const lines = [
    "/**",
    " * Mapping of HP, OMIM and Orphanet term IDs to their names.",
    " * Generated by scripts/lookup-diagnosis-terms.ts; do not edit by hand.",
    ' * To refresh it, see "Refresh diagnosis term names" in README.md.',
    " *",
    " * Sources:",
    ` *   - HP terms: hp.obo from the Human Phenotype Ontology${version(versions.hpo)}`,
    ` *   - OMIM terms: phenotype.hpoa from the Human Phenotype Ontology${version(versions.hpoa)}`,
    ` *   - Orphanet terms: Orphadata disease list (en_product1.xml)${version(versions.orphadata)}.`,
    " *     Orphanet: an online rare disease and orphan drug data base. Copyright INSERM.",
    " *     Available at https://www.orpha.net. Licensed under CC BY 4.0",
    " *     (https://creativecommons.org/licenses/by/4.0/).",
    " *   - Term IDs: AnVIL Azul API (explore.anvilproject.org)",
    " */",
    "export const DIAGNOSIS_DISPLAY_VALUE: Record<string, string> = {",
  ];
  for (const id of [...mapping.keys()].sort()) {
    lines.push(`  ${JSON.stringify(id)}: ${JSON.stringify(mapping.get(id))},`);
  }
  lines.push("};", "");
  return lines.join("\n");
}

/**
 * Append a value to the list stored under the given key.
 * @param map - Map of key to list.
 * @param key - Key.
 * @param value - Value to append.
 */
function pushTo(map: Map<string, string[]>, key: string, value: string): void {
  const list = map.get(key);
  if (list) list.push(value);
  else map.set(key, [value]);
}

/**
 * Decode the XML entities used in Orphadata names.
 * @param text - Text with XML entities.
 * @returns decoded text.
 */
function decodeXmlEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
