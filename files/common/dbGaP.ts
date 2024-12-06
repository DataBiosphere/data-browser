import { Bundle, Coding, Extension, ResearchStudy } from "fhir/r4";
import { decode } from "html-entities";
import fetch, { Response } from "node-fetch";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { DbGapStudy } from "../../app/apis/catalog/common/entities";
import { delayFetch } from "./utils";

const urlPrefixFHIR =
  "https://dbgap-api.ncbi.nlm.nih.gov/fhir/x1/ResearchStudy?_id=";
const urlSuffixFHIR = "&_format=json";

/**
 * Returns the FHIR url.
 * @param dbGapId - id of the study
 * @returns  FHIR URL for a given study id.
 */
export function getFHIRURL(dbGapId: string): string {
  return `${urlPrefixFHIR}${dbGapId}${urlSuffixFHIR}`;
}

const studyBuddy = new Map<string, DbGapStudy>();

/**
 * Fetches FHIR page specified by URL and returns corresponding raw JSON.
 * @param dbGapId - the id of the study
 * @returns {Promise.<*>} - promise with response
 */
async function fetchFHIRJSON(dbGapId: string): Promise<Bundle | null> {
  /* FHIR limits rate of requests per user. Use setTimeout between each fetch to avoid a HTTP 429 response. */
  await delayFetch(250);
  const url = getFHIRURL(dbGapId);
  try {
    const response = await fetch(url);
    const status = response.status;

    /* Parse the response. */
    if (status === 200) {
      return await parseFHIRJSON(response);
    } else {
      console.log(`FHIR fetch status error ${status} for ${url}`);
      // TODO nothing to return here?
      return null;
    }
  } catch (error) {
    console.log("Error fetching url:" + url);
    console.log(error);
    return null;
  }
}

/**
 * Returns the study description in markdown formatted text.
 * @param resource - the dbGaP FHIR resource.
 * @returns description form the FHIR response with embedded html for links.
 */
function getStudyDescription(resource: ResearchStudy): string {
  if (resource) {
    const rawDescription = resource.description;
    if (rawDescription) {
      /* Replace any `\n\n\t` with space to avoid unwanted line breaks
      /* Replace any `\t` (tab) with a space - avoids markdown processing tab as <pre/>. */
      /* Replace any dbGap internal links with an external link to the dbGap study. */
      const parsedDescription = rawDescription
        .replace(/\n\n\t/g, " ")
        .replace(/\t/g, " ")
        .replace(
          /study.cgi\?study_id=|.\/study.cgi\?study_id=/g,
          "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id="
        );
      return markdownToHTML(parsedDescription);
    }
  }
  return "";
}

/**
 * Returns the dbGaP study from local cache or go get it from dbGap.
 * @param phsId - of the study
 * @returns the study from the local cache or dbGap.
 */
export async function getStudy(phsId: string): Promise<DbGapStudy | null> {
  if (!phsId.startsWith("phs")) {
    return null;
  }

  let study = studyBuddy.get(phsId);
  if (study) {
    return study;
  }

  const bundle = await fetchFHIRJSON(phsId);
  if (bundle && bundle.entry && bundle.entry[0]) {
    const resource = bundle.entry[0].resource as ResearchStudy;
    study = {
      consentCodes: rollUpConsentCodes(resource),
      dataTypes: rollUpDataTypes(resource),
      dbGapId: phsId,
      description: getStudyDescription(resource),
      focus: getFocus(resource),
      participantCount: rollUpSubjectsTotal(resource),
      studyAccession: getStudyIdentifier(resource),
      studyDesigns: rollUpStudyDesigns(resource),
      title: getStudyName(resource),
    };
  } else {
    study = {
      consentCodes: [],
      dataTypes: [],
      dbGapId: phsId,
      description: "",
      focus: "",
      participantCount: 0,
      studyAccession: "",
      studyDesigns: [],
      title: "",
    };
  }
  studyBuddy.set(study.dbGapId, study);
  return study;
}

/**
 * Returns the study name associated with the first entry.
 * Any subsequent entries are ignored.
 * @param resource - the dbGaP FHIR resource.
 * @returns the study name associated with the first entry.
 */
function getStudyIdentifier(resource: ResearchStudy): string {
  /* Grab the first entry's resource property. */
  if (resource) {
    const identifier = resource.identifier;

    /* Return study name. */
    if (identifier && identifier[0] && identifier[0].value) {
      return identifier[0].value;
    }
  }

  return "";
}

/**
 * Returns the consent codes for the study.
 * param resource - the FHIR resource
 * @param resource - the dbGaP FHIR resource.
 * @returns An array of consent codes for the given resource.
 */
function rollUpConsentCodes(resource: ResearchStudy): string[] {
  /* Define the extension type of interest. */
  const extensionType = "ResearchStudy-StudyConsents";

  /* Grab any accumulated consent codes. */
  const consentCodes: string[] = [];

  if (resource) {
    /* Find the resource extensions for the study consents; the url ends with ~ResearchStudy-StudyConsents. */
    const studyConsents = findExtensionType(resource, extensionType);

    if (studyConsents) {
      const { extension } = studyConsents;

      if (extension) {
        return extension.reduce((acc, node) => {
          const { valueCoding } = node || {},
            { display } = valueCoding || {};
          if (display) {
            acc.push(display);
          }
          return acc;
        }, consentCodes);
      }
    }
  }

  return consentCodes;
}

/**
 * Returns the molecular data types for the study.
 * @param resource - the dbGaP FHIR resource.
 * @returns An array of datatypes for the given resource.
 */
function rollUpDataTypes(resource: ResearchStudy): string[] {
  /* Define the extension type of interest. */
  const extensionType = "MolecularDataTypes";

  /* Grab any accumulated data types. */
  const dataTypes: string[] = [];

  if (resource) {
    /* Find the resource extensions for the molecular data types; the url ends with ~MolecularDataTypes. */
    const molecularDataType = findExtensionType(resource, extensionType);

    if (molecularDataType) {
      const { extension } = molecularDataType;

      if (extension) {
        return extension.reduce((acc, node) => {
          const { valueCodeableConcept } = node || {},
            { coding } = valueCodeableConcept || {};
          if (coding) {
            const codes = getMolecularCodes(coding);
            acc = acc.concat(codes);
          }
          return acc;
        }, dataTypes);
      }
    }
  }

  return dataTypes;
}

/**
 * Returns the study designs for the study.
 * @param resource - the FHIR ResearchStudy
 * @returns An array of study designs.
 */
function rollUpStudyDesigns(resource: ResearchStudy): string[] {
  /* Define the system type of interest. */
  const systemType = "ResearchStudy-StudyDesign";

  /* Grab any accumulated study designs. */
  const studyDesigns: string[] = [];

  if (resource) {
    /* Grab the category array. */
    const categories = resource.category;

    if (categories) {
      /* Accumulate any codes belonging to study design. */
      return categories.reduce((acc: string[], category) => {
        const { coding } = category || {};
        if (coding) {
          const codes = getDesignCodes(coding, systemType);
          acc = acc.concat(codes);
        }
        return acc;
      }, studyDesigns);
    }
  }

  return studyDesigns;
}

/**
 * Returns a list of system design codes belonging to the specified system type.
 * @param coding - an array of cooding objects from the resource.
 * @param systemType - the coding sytem the code belogns to.
 * @returns An array of study design code for the given resource.
 */
function getDesignCodes(coding: Coding[], systemType: string): string[] {
  if (coding) {
    return coding.reduce((acc: string[], designCode) => {
      const { code, system } = designCode;

      if (system && isStrPartialMatch(system, systemType) && code) {
        acc.push(code);
      }
      return acc;
    }, []);
  }

  return [];
}

/**
 * Returns the molecular data types.
 * @param coding - array of codes for this resource
 * @returns An array of molecular codes
 */
function getMolecularCodes(coding: Coding[]): string[] {
  if (coding) {
    return coding.reduce((acc: string[], molecularCode: Coding) => {
      const { code } = molecularCode;
      if (code) {
        acc.push(code);
      }
      return acc;
    }, []);
  }
  return [];
}

/**
 * Returns true if the specified search string partially matches the specified string.
 * @param str - the string to search.
 * @param searchStr - the string to match.
 * @returns True of the given search term matches the given string.
 */
function isStrPartialMatch(str: string, searchStr: string): boolean {
  if (str) {
    const lowerCStr = str.toLowerCase();
    const lowerCSearchStr = searchStr.toLowerCase();
    return lowerCStr.includes(lowerCSearchStr);
  }
  return false;
}

/**
 * Returns the study name associated with the first entry.
 * Any subsequent entries are ignored.
 * @param resource - the FHIR resource
 * @returns the study name associated with the first entry.
 */
function getStudyName(resource: ResearchStudy): string {
  if (resource) {
    const title = resource.title;

    /* Return study name. */
    if (title) {
      return decode(title);
    }
  }

  return "";
}

/**
 * Returns the focuses (diseases), rolled up from focus field's text field.
 * @param resource - the dbGaP FHIR resource.
 * @returns The study focus or "" if the focus does not exist.
 */
function getFocus(resource: ResearchStudy): string {
  return resource?.focus?.[0]?.text ?? "";
}

/**
 * Calculate total number of subjects for this study.
 * @param resource - dbGaP FHIR Resource
 * @returns the number of subjects.
 */
function rollUpSubjectsTotal(resource: ResearchStudy): number {
  /* Define the extension type of interest. */
  const extensionType = "ResearchStudy-Content";
  const extensionTypeCount = "ResearchStudy-Content-NumSubjects";

  /* Grab any accumulated subjects totals. */
  const subjectsTotal = 0;

  if (resource) {
    /* Find the resource extensions for the study content; the url ends with ~ResearchStudy-Content. */
    const studyContent = findExtensionType(resource, extensionType);

    if (studyContent) {
      const { extension } = studyContent;

      if (extension) {
        return extension.reduce((acc: number, node: Extension) => {
          const { url, valueCount } = node || {},
            { value } = valueCount || {};

          if (isExtensionType(url, extensionTypeCount) && value) {
            acc += value;
          }

          return acc;
        }, subjectsTotal);
      }
    }
  }

  return subjectsTotal;
}

/**
 * Check if an extension if a given type.
 * @param url - extension url
 * @param extensionType -extension type
 * @returns Returns true if the specified extension type string is in the specified url.
 */
function isExtensionType(url: string, extensionType = ""): boolean {
  if (url) {
    const extensionStr = extensionType.toLowerCase();
    const urlStr = url.toLowerCase();

    return urlStr.includes(extensionStr);
  }
  return false;
}

/**
 * Find Extensions by type name
 * @param resource - FHIR Resource
 * @param stringSnippet - string
 * @returns Returns the resource extension specified by extension type or undefined if it's not found.
 */
function findExtensionType(
  resource: ResearchStudy,
  stringSnippet = ""
): Extension | undefined {
  const resourceExtensions = resource.extension;

  if (resourceExtensions) {
    return resourceExtensions.find((extensions) => {
      const { url } = extensions;
      if (url) {
        const subStr = stringSnippet.toLowerCase();
        return url.toLowerCase().includes(subStr);
      }
      return false;
    });
  }
}

/**
 * Returns parsed FHIR JSON.
 * @param response - the response returned from the FHIR API call
 * @returns {Promise<{entry}|*>} - resolved when resonse.json() is complete.
 */
async function parseFHIRJSON(response: Response): Promise<Bundle> {
  /* Grab the JSON. */
  return (await response.json()) as Bundle;
}

export function markdownToHTML(markdown: string): string {
  const schema = Object.assign({}, defaultSchema);
  schema.tagNames = (schema.tagNames || []).concat(["u"]);
  return unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, schema)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();
  // see https://github.com/vfile/vfile/issues/45
}
