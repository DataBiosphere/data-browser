import type { DatasetsResponse } from "../../../app/apis/azul/anvil-cmg/common/responses";
import { buildAnvilDatasetJsonLd } from "../../../app/utils/schemaOrg/anvilDataset";
import { DESCRIPTION_LENGTH } from "../../../app/utils/schemaOrg/constants";

const BROWSER_URL = "https://explore.anvilproject.org";

/**
 * Builds a minimal valid AnVIL datasets response with optional overrides for
 * top-level (dataset) and aggregated (activity/biosample/donor/file/library/
 * diagnosis) fields.
 * @param overrides - Partial overrides applied to the base response.
 * @returns A `DatasetsResponse` shape suitable for builder tests.
 */
function makeDatasetsResponse(
  overrides: Partial<DatasetsResponse> = {}
): DatasetsResponse {
  return {
    activities: [],
    biosamples: [],
    datasets: [
      {
        accessible: true,
        consent_group: ["NRES"],
        dataset_id: "uuid-1",
        description:
          "A multi-cohort study of rare disease across many donors and biosamples.",
        duos_id: null,
        registered_identifier: [],
        title: "Rare disease dataset",
      },
    ],
    diagnoses: [],
    donors: [],
    entryId: "abc",
    files: [],
    libraries: [],
    status: 200,
    ...overrides,
  } as unknown as DatasetsResponse;
}

describe("buildAnvilDatasetJsonLd", () => {
  it("returns undefined when no dataset is present", () => {
    const response = makeDatasetsResponse({ datasets: [] });
    expect(buildAnvilDatasetJsonLd(response, BROWSER_URL)).toBeUndefined();
  });

  it("populates required Schema.org Dataset fields", () => {
    const result = buildAnvilDatasetJsonLd(makeDatasetsResponse(), BROWSER_URL);
    expect(result).toBeDefined();
    expect(result!["@context"]).toBe("https://schema.org");
    expect(result!["@type"]).toBe("Dataset");
    expect(result!.name).toBe("Rare disease dataset");
    expect(result!.description).toBe(
      "A multi-cohort study of rare disease across many donors and biosamples."
    );
    expect(result!.url).toBe(`${BROWSER_URL}/datasets/uuid-1`);
    expect(result!.identifier).toEqual(["uuid-1"]);
    expect(result!.isAccessibleForFree).toBe(true);
    expect(result!.includedInDataCatalog).toEqual({
      "@type": "DataCatalog",
      name: "AnVIL Data Explorer",
      url: BROWSER_URL,
    });
  });

  it("falls back to dataset_id when title is empty", () => {
    const response = makeDatasetsResponse();
    response.datasets[0].title = "";
    const result = buildAnvilDatasetJsonLd(response, BROWSER_URL);
    expect(result!.name).toBe("uuid-1");
  });

  it("strips HTML tags from description", () => {
    const response = makeDatasetsResponse();
    response.datasets[0].description =
      "<p>Single-cell <strong>RNA-seq</strong> data across many donors and tissues.</p>";
    const result = buildAnvilDatasetJsonLd(response, BROWSER_URL);
    expect(result!.description).toBe(
      "Single-cell RNA-seq data across many donors and tissues."
    );
  });

  it("truncates descriptions over 5000 characters and appends an ellipsis", () => {
    const longDescription = "a".repeat(DESCRIPTION_LENGTH.MAX + 200);
    const response = makeDatasetsResponse();
    response.datasets[0].description = longDescription;
    const result = buildAnvilDatasetJsonLd(response, BROWSER_URL);
    expect(result!.description).toHaveLength(DESCRIPTION_LENGTH.MAX);
    expect(result!.description.endsWith("…")).toBe(true);
  });

  it("pads short descriptions with name and catalog context to meet the 50-char minimum", () => {
    const response = makeDatasetsResponse();
    response.datasets[0].description = "Short.";
    const result = buildAnvilDatasetJsonLd(response, BROWSER_URL);
    expect(result!.description).toBe(
      "Rare disease dataset — Short. — AnVIL Data Explorer dataset."
    );
    expect(result!.description.length).toBeGreaterThanOrEqual(
      DESCRIPTION_LENGTH.MIN
    );
  });

  it("falls back to dataset name plus catalog context when description is missing", () => {
    const response = makeDatasetsResponse();
    response.datasets[0].description = undefined;
    const result = buildAnvilDatasetJsonLd(response, BROWSER_URL);
    expect(result!.description).toBe(
      "Rare disease dataset — AnVIL Data Explorer dataset."
    );
    expect(result!.description.length).toBeGreaterThanOrEqual(
      DESCRIPTION_LENGTH.MIN
    );
  });

  it("includes registered_identifier values in identifier and dbGaP study URLs in sameAs", () => {
    const response = makeDatasetsResponse();
    response.datasets[0].registered_identifier = [
      "phs000123",
      "phs000456",
      null,
    ];
    const result = buildAnvilDatasetJsonLd(response, BROWSER_URL);
    expect(result!.identifier).toEqual(["uuid-1", "phs000123", "phs000456"]);
    expect(result!.sameAs).toEqual([
      "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000123",
      "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000456",
    ]);
  });

  it("omits sameAs when there are no registered identifiers", () => {
    const result = buildAnvilDatasetJsonLd(makeDatasetsResponse(), BROWSER_URL);
    expect(result!.sameAs).toBeUndefined();
  });

  it("builds deduplicated keywords from activity, biosample, donor, diagnosis, file, and library fields", () => {
    const response = makeDatasetsResponse({
      activities: [
        { activity_type: ["sequencing"], data_modality: ["genomic"] },
      ],
      biosamples: [{ anatomical_site: ["brain"], biosample_type: ["tissue"] }],
      diagnoses: [{ disease: ["epilepsy"], phenotype: [] }],
      donors: [
        {
          organism_type: ["Homo sapiens"],
          phenotypic_sex: ["female"],
          reported_ethnicity: ["asian"],
        },
      ],
      files: [
        {
          data_modality: ["genomic"],
          file_format: ["fastq", "bam"],
          file_id: "f1",
          file_type: "sequencing",
        },
      ],
      libraries: [{ prep_material_name: ["DNA"] }],
    } as unknown as Partial<DatasetsResponse>);
    const result = buildAnvilDatasetJsonLd(response, BROWSER_URL);
    expect(result!.keywords).toEqual([
      "sequencing",
      "genomic",
      "brain",
      "tissue",
      "Homo sapiens",
      "female",
      "asian",
      "epilepsy",
      "fastq",
      "bam",
      "DNA",
    ]);
  });

  it("omits keywords and sameAs when sources are empty", () => {
    const result = buildAnvilDatasetJsonLd(makeDatasetsResponse(), BROWSER_URL);
    expect(result!.keywords).toBeUndefined();
    expect(result!.sameAs).toBeUndefined();
  });
});
