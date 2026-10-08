import {
  extractTermIds,
  findEmptySources,
  findUnnamedIds,
  generateLookupModule,
  getAzulStatusProblem,
  hasDiagnosisFacets,
  parseHpoa,
  parseHpObo,
  parseOrphadata,
  parseSourceVersions,
  type TermIds,
} from "../../scripts/lookup-diagnosis-terms/utils";

const HP_OBO = `format-version: 1.2
data-version: hp/releases/2026-09-01

[Term]
id: HP:0000001
name: All

[Term]
id: HP:0000077
name: Abnormality of the kidney
alt_id: HP:0000075

[Term]
id: HP:0000002
name: obsolete Abnormality of body height

[Typedef]
id: part_of
name: part of
`;

const HPOA = `#description: "HPO annotations for rare diseases"
#version: 2026-09-02
database_id\tdisease_name\tqualifier\thpo_id
OMIM:310200\tMuscular dystrophy, Duchenne type\t\tHP:0003236
OMIM:310200\tA later name that should be ignored\t\tHP:0001270
ORPHA:146\tDifferentiated thyroid carcinoma\t\tHP:0002890
`;

const ORPHADATA = `<?xml version="1.0" encoding="UTF-8"?>
<JDBOR date="2026-06-23 07:53:50" version="1.3.42">
  <DisorderList count="2">
    <Disorder id="17601">
      <OrphaCode>146</OrphaCode>
      <ExpertLink lang="en">http://www.orpha.net/consor/cgi-bin/OC_Exp.php?lng=en&amp;Expert=146</ExpertLink>
      <Name lang="en">Differentiated thyroid carcinoma</Name>
      <DisorderType id="21394">
        <Name lang="en">Disease</Name>
      </DisorderType>
    </Disorder>
    <Disorder id="17602">
      <OrphaCode>230857</OrphaCode>
      <ExpertLink lang="en">http://www.orpha.net/consor/cgi-bin/OC_Exp.php?lng=en&amp;Expert=230857</ExpertLink>
      <Name lang="en">Ataxia &amp; &#233;pilepsy &quot;type 2&quot;</Name>
      <DisorderGroup id="36547">
        <Name lang="en">Disorder</Name>
      </DisorderGroup>
    </Disorder>
  </DisorderList>
</JDBOR>
`;

/**
 * Build a TermIds value from lists of IDs.
 * @param ids - IDs by group.
 * @returns term IDs.
 */
function termIds(ids: Partial<Record<keyof TermIds, string[]>>): TermIds {
  return {
    hp: new Set(ids.hp),
    omim: new Set(ids.omim),
    orphanet: new Set(ids.orphanet),
    other: new Set(ids.other),
  };
}

describe("extractTermIds", () => {
  test("groups IDs from both diagnosis facets by prefix", () => {
    const ids = extractTermIds({
      "diagnoses.disease": {
        terms: [
          { term: "HP:0000077" },
          { term: "OMIM:310200; OMIM:152950" },
          { term: "ORPHA:146" },
          { term: "Orphanet:230857" },
          { term: "MONDO:0005148" },
          { term: null },
        ],
      },
      "diagnoses.phenotype": { terms: [{ term: "HP:0000001" }] },
    });
    expect(ids).toEqual(
      termIds({
        hp: ["HP:0000077", "HP:0000001"],
        omim: ["OMIM:310200", "OMIM:152950"],
        orphanet: ["ORPHA:146", "Orphanet:230857"],
        other: ["MONDO:0005148"],
      })
    );
  });

  test("reports malformed IDs as other and ignores labels", () => {
    const ids = extractTermIds({
      "diagnoses.disease": {
        terms: [
          { term: "H:0010609" },
          { term: "HP:00001" },
          { term: "Abdominal pain" },
          { term: "Pleurisy; pleural effusion" },
        ],
      },
    });
    expect(ids).toEqual(termIds({ other: ["H:0010609", "HP:00001"] }));
  });

  test("returns no IDs when the facets are missing", () => {
    expect(extractTermIds({})).toEqual(termIds({}));
  });

  test("includes extra IDs that are not in the facets, without duplicates", () => {
    const ids = extractTermIds(
      { "diagnoses.disease": { terms: [{ term: "HP:0000077" }] } },
      ["HP:0000077", "HP:0000003", "Orphanet:230857"]
    );
    expect(ids).toEqual(
      termIds({
        hp: ["HP:0000077", "HP:0000003"],
        orphanet: ["Orphanet:230857"],
      })
    );
  });
});

describe("parseHpObo", () => {
  test("names current and retired IDs and strips the obsolete prefix", () => {
    const names = parseHpObo(
      HP_OBO,
      new Set(["HP:0000077", "HP:0000075", "HP:0000002"])
    );
    expect(names).toEqual(
      new Map([
        ["HP:0000077", "Abnormality of the kidney"],
        ["HP:0000075", "Abnormality of the kidney"],
        ["HP:0000002", "Abnormality of body height"],
      ])
    );
  });

  test("names only the requested IDs", () => {
    expect(parseHpObo(HP_OBO, new Set(["HP:0000001"]))).toEqual(
      new Map([["HP:0000001", "All"]])
    );
  });
});

describe("parseHpoa", () => {
  test("keeps the first name for each OMIM ID and skips header lines", () => {
    const names = parseHpoa(HPOA, new Set(["OMIM:310200", "OMIM:999999"]));
    expect(names).toEqual(
      new Map([["OMIM:310200", "Muscular dystrophy, Duchenne type"]])
    );
  });
});

describe("parseOrphadata", () => {
  test("names both spellings of an Orphanet ID with the disease's own name", () => {
    const names = parseOrphadata(
      ORPHADATA,
      new Set(["ORPHA:146", "Orphanet:146"])
    );
    expect(names).toEqual(
      new Map([
        ["ORPHA:146", "Differentiated thyroid carcinoma"],
        ["Orphanet:146", "Differentiated thyroid carcinoma"],
      ])
    );
  });

  test("decodes XML entities in names", () => {
    const names = parseOrphadata(ORPHADATA, new Set(["Orphanet:230857"]));
    expect(names.get("Orphanet:230857")).toBe('Ataxia & épilepsy "type 2"');
  });

  test("removes status prefixes from inactive entries", () => {
    const xml = [
      '<Disorder id="1"><OrphaCode>101</OrphaCode>',
      '<Name lang="en">OBSOLETE: Old syndrome</Name></Disorder>',
      '<Disorder id="2"><OrphaCode>102</OrphaCode>',
      '<Name lang="en">NON RARE IN EUROPE: Common condition</Name></Disorder>',
    ].join("\n");
    expect(parseOrphadata(xml, new Set(["ORPHA:101", "Orphanet:102"]))).toEqual(
      new Map([
        ["ORPHA:101", "Old syndrome"],
        ["Orphanet:102", "Common condition"],
      ])
    );
  });

  test("leaves out IDs that are not in the file", () => {
    expect(parseOrphadata(ORPHADATA, new Set(["ORPHA:1"]))).toEqual(new Map());
  });
});

describe("parseSourceVersions", () => {
  test("reads each source's release version", () => {
    expect(
      parseSourceVersions({ hpObo: HP_OBO, hpoa: HPOA, orphadata: ORPHADATA })
    ).toEqual({
      hpo: "hp/releases/2026-09-01",
      hpoa: "2026-09-02",
      orphadata: "2026-06-23",
    });
  });
});

describe("parseSourceVersions with unexpected version lines", () => {
  test("leaves out versions that are not plain version strings", () => {
    expect(
      parseSourceVersions({
        hpObo: "data-version: hp/releases/2026-09-01 */ injected(); /*\n",
        hpoa: "#version: 2026 09 02\n",
        orphadata: "<JDBOR>",
      })
    ).toEqual({ hpo: undefined, hpoa: undefined, orphadata: undefined });
  });
});

describe("findEmptySources", () => {
  test("lists a source that gave no names for requested IDs", () => {
    expect(
      findEmptySources({
        hp: {
          ids: new Set(["HP:0000077"]),
          names: new Map([["HP:0000077", "Abnormality of the kidney"]]),
        },
        orphadata: { ids: new Set(["ORPHA:146"]), names: new Map() },
      })
    ).toEqual(["orphadata"]);
  });

  test("ignores a source that gave some names, or had no IDs to name", () => {
    expect(
      findEmptySources({
        hpoa: {
          ids: new Set(["OMIM:310200", "OMIM:606157"]),
          names: new Map([["OMIM:310200", "Muscular dystrophy"]]),
        },
        orphadata: { ids: new Set(), names: new Map() },
      })
    ).toEqual([]);
  });
});

describe("getAzulStatusProblem", () => {
  test("returns nothing when Azul is up and not indexing", () => {
    expect(
      getAzulStatusProblem({
        progress: { unindexed_bundles: 0, unindexed_documents: 0, up: true },
        up: true,
      })
    ).toBeUndefined();
  });

  test("reports Azul as down", () => {
    expect(getAzulStatusProblem({ progress: { up: false }, up: true })).toBe(
      "AnVIL Azul reports that it is down"
    );
    expect(getAzulStatusProblem({})).toBe("AnVIL Azul reports that it is down");
  });

  test("reports indexing with the work left", () => {
    expect(
      getAzulStatusProblem({
        progress: { unindexed_bundles: 12, unindexed_documents: 0, up: true },
        up: true,
      })
    ).toBe(
      "AnVIL Azul is indexing (12 bundles, 0 documents left), so its facets may be incomplete"
    );
  });
});

describe("hasDiagnosisFacets", () => {
  test("is true when either diagnosis facet is present", () => {
    expect(hasDiagnosisFacets({ "diagnoses.disease": { terms: [] } })).toBe(
      true
    );
    expect(hasDiagnosisFacets({ "diagnoses.phenotype": { terms: [] } })).toBe(
      true
    );
  });

  test("is false when both are missing", () => {
    expect(hasDiagnosisFacets({ "donors.organism_type": { terms: [] } })).toBe(
      false
    );
    expect(hasDiagnosisFacets(undefined)).toBe(false);
  });
});

describe("findUnnamedIds", () => {
  test("lists IDs with no name, grouped by prefix", () => {
    const ids = termIds({
      hp: ["HP:0000077"],
      omim: ["OMIM:606157", "OMIM:310200"],
      orphanet: ["ORPHA:146"],
      other: ["MONDO:0005148", "H:0010609"],
    });
    const mapping = new Map([
      ["HP:0000077", "Abnormality of the kidney"],
      ["OMIM:310200", "Muscular dystrophy, Duchenne type"],
      ["ORPHA:146", "Differentiated thyroid carcinoma"],
    ]);
    expect(findUnnamedIds(ids, mapping)).toEqual(
      new Map([
        ["H", ["H:0010609"]],
        ["MONDO", ["MONDO:0005148"]],
        ["OMIM", ["OMIM:606157"]],
      ])
    );
  });

  test("returns nothing when every ID has a name", () => {
    const ids = termIds({ hp: ["HP:0000077"] });
    const mapping = new Map([["HP:0000077", "Abnormality of the kidney"]]);
    expect(findUnnamedIds(ids, mapping).size).toBe(0);
  });
});

describe("generateLookupModule", () => {
  const source = generateLookupModule(
    new Map([
      ["OMIM:310200", 'Name with "quotes"'],
      ["HP:0000077", "Abnormality of the kidney"],
    ]),
    {
      hpo: "hp/releases/2026-09-01",
      hpoa: "2026-09-02",
      orphadata: "2026-06-23",
    }
  );

  test("sorts IDs and escapes names", () => {
    expect(source).toContain(
      [
        "export const DIAGNOSIS_DISPLAY_VALUE: Record<string, string> = {",
        '  "HP:0000077": "Abnormality of the kidney",',
        '  "OMIM:310200": "Name with \\"quotes\\"",',
        "};",
      ].join("\n")
    );
  });

  test("credits Orphanet and records the source versions", () => {
    expect(source).toContain("Licensed under CC BY 4.0");
    expect(source).toContain("https://www.orpha.net");
    expect(source).toContain("(hp/releases/2026-09-01)");
    expect(source).toContain("(2026-06-23)");
  });

  test("points to the README section by its exact heading", () => {
    expect(source).toContain(
      '"Refresh diagnosis term names in AnVIL Data Explorer"'
    );
  });
});
