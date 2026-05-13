/**
 * Shared Schema.org Dataset builder for consumers that surface HCA-style
 * `ProjectResponse` data (HCA DCP, LungMAP). Per-consumer files (e.g.
 * `hcaProjectDataset.ts`, `lungmapProjectDataset.ts`) supply a
 * `ProjectCatalogOptions` describing catalog identity and call
 * `buildProjectJsonLd` to produce the JSON-LD payload.
 */

import type {
  AccessionResponse,
  ContributorResponse,
  PublicationResponse,
} from "../../apis/azul/hca-dcp/common/entities";
import type { ProjectsResponse } from "../../apis/azul/hca-dcp/common/responses";
import { transformAccessionURL } from "../../viewModelBuilders/azul/hca-dcp/common/accessionMapper/accessionMapper";
import { ACCESSION_CONFIGS_BY_RESPONSE_KEY } from "../../viewModelBuilders/azul/hca-dcp/common/accessionMapper/constants";
import type {
  SchemaDataset,
  SchemaOrganization,
  SchemaPerson,
  SchemaScholarlyArticle,
} from "./types";
import { buildDescription, uniqueNonEmpty } from "./utils";

/**
 * Per-consumer catalog identity used to populate `includedInDataCatalog` and
 * the description-padding fallback. Callers (e.g. HCA, LungMAP) supply this
 * via thin wrappers so the shared builder stays consumer-agnostic.
 */
export interface ProjectCatalogOptions {
  catalogName: string;
  descriptionFallbackSuffix: string;
}

/**
 * Builds the citation array from project publications. Skips entries without a
 * title. Prefers DOI for `sameAs`, falling back to the publication URL.
 * @param publications - Project publications.
 * @returns Array of schema.org ScholarlyArticle objects.
 */
function buildCitations(
  publications: PublicationResponse[]
): SchemaScholarlyArticle[] {
  const citations: SchemaScholarlyArticle[] = [];
  for (const publication of publications ?? []) {
    if (!publication.publicationTitle) continue;
    const article: SchemaScholarlyArticle = {
      "@type": "ScholarlyArticle",
      headline: publication.publicationTitle,
      name: publication.publicationTitle,
    };
    if (publication.doi) {
      article.sameAs = `https://doi.org/${publication.doi}`;
    } else if (publication.publicationUrl) {
      article.sameAs = publication.publicationUrl;
    }
    citations.push(article);
  }
  return citations;
}

/**
 * Builds the creator array from project contributors. Skips entries without a
 * name. When the contributor has an institution, attaches it as an affiliation.
 * @param contributors - Project contributors.
 * @returns Array of schema.org Person objects.
 */
function buildCreators(contributors: ContributorResponse[]): SchemaPerson[] {
  const creators: SchemaPerson[] = [];
  for (const contributor of contributors ?? []) {
    if (!contributor.contactName) continue;
    const person: SchemaPerson = {
      "@type": "Person",
      name: normaliseContactName(contributor.contactName),
    };
    if (contributor.institution) {
      const affiliation: SchemaOrganization = {
        "@type": "Organization",
        name: contributor.institution,
      };
      person.affiliation = affiliation;
    }
    creators.push(person);
  }
  return creators;
}

/**
 * Builds a keywords array by unioning biologically-meaningful fields from the
 * project's aggregated donor/sample/specimen/protocol responses.
 * @param data - Project detail response.
 * @returns Deduplicated keywords array.
 */
function buildKeywords(data: ProjectsResponse): string[] {
  const values: (string | null | undefined)[] = [];
  for (const donor of data.donorOrganisms ?? []) {
    values.push(...(donor.genusSpecies ?? []));
    values.push(...(donor.disease ?? []));
  }
  for (const sample of data.samples ?? []) {
    values.push(...(sample.organ ?? []));
    values.push(...(sample.organPart ?? []));
    values.push(...(sample.disease ?? []));
    values.push(...(sample.sampleEntityType ?? []));
  }
  for (const specimen of data.specimens ?? []) {
    values.push(...(specimen.organ ?? []));
    values.push(...(specimen.organPart ?? []));
    values.push(...(specimen.disease ?? []));
  }
  for (const protocol of data.protocols ?? []) {
    values.push(...(protocol.libraryConstructionApproach ?? []));
    values.push(...(protocol.instrumentManufacturerModel ?? []));
  }
  return uniqueNonEmpty(values);
}

/**
 * Builds a Schema.org Dataset JSON-LD object from a project detail response.
 *
 * Returns `undefined` when the response does not carry a project we can
 * describe, so the caller can skip rendering.
 * @param data - Project detail response from Azul.
 * @param browserURL - Site base URL used for canonical and catalog URLs.
 * @param options - Consumer-specific catalog identity.
 * @returns Schema.org Dataset JSON-LD object, or `undefined` if not buildable.
 */
export function buildProjectJsonLd(
  data: ProjectsResponse,
  browserURL: string,
  options: ProjectCatalogOptions
): SchemaDataset | undefined {
  const project = data.projects?.[0];
  if (!project) return undefined;

  const name = project.projectTitle || project.projectShortname;
  const description = buildDescription(
    project.projectDescription,
    name,
    options.descriptionFallbackSuffix
  );
  const identifier = uniqueNonEmpty([
    project.projectId,
    ...project.accessions.flatMap((accession) =>
      splitAccessionIds(accession.accession)
    ),
  ]);

  const jsonLd: SchemaDataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    description,
    identifier,
    includedInDataCatalog: {
      "@type": "DataCatalog",
      name: options.catalogName,
      url: browserURL,
    },
    isAccessibleForFree: true,
    name,
    url: `${browserURL}/projects/${project.projectId}`,
  };

  const sameAs = buildSameAs(project.accessions);
  if (sameAs.length > 0) jsonLd.sameAs = sameAs;

  const keywords = buildKeywords(data);
  if (keywords.length > 0) jsonLd.keywords = keywords;

  const creator = buildCreators(project.contributors);
  if (creator.length > 0) jsonLd.creator = creator;

  const citation = buildCitations(project.publications);
  if (citation.length > 0) jsonLd.citation = citation;

  return jsonLd;
}

/**
 * Builds the sameAs array of external accession URLs via identifiers.org.
 * Only includes accessions whose namespace maps to a known identifier prefix.
 * @param accessions - Project accessions from the Azul response.
 * @returns Array of canonical accession URLs.
 */
function buildSameAs(accessions: AccessionResponse[]): string[] {
  const urls: string[] = [];
  for (const { accession, namespace } of accessions) {
    const prefix =
      ACCESSION_CONFIGS_BY_RESPONSE_KEY.get(namespace)?.identifierOrgPrefix;
    if (!prefix) continue;
    for (const id of splitAccessionIds(accession)) {
      const url = transformAccessionURL(id, prefix);
      if (url) urls.push(url);
    }
  }
  return uniqueNonEmpty(urls);
}

/**
 * Normalises an Azul contributor's contactName from "Last,First,Middle" to
 * "First Middle Last" for use as a Schema.org Person.name value.
 * @param contactName - Raw contactName from the Azul response.
 * @returns Human-readable contributor name.
 */
function normaliseContactName(contactName: string): string {
  const parts = contactName.split(",").map((part) => part.trim());
  if (parts.length < 2) return contactName;
  const [last, ...rest] = parts;
  return [...rest, last].filter(Boolean).join(" ");
}

/**
 * Splits an Azul accession string into individual accession IDs. Azul returns
 * accessions as a semicolon-separated string when a project carries multiple
 * IDs under the same namespace (mirrors the split done by `mapAccessions`).
 * @param accession - Raw accession value from the Azul response.
 * @returns Trimmed, non-empty accession IDs.
 */
function splitAccessionIds(accession: string): string[] {
  return accession
    .split(";")
    .map((id) => id.trim())
    .filter(Boolean);
}
