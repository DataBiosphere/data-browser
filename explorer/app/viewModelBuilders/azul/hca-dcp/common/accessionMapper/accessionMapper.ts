import { AccessionResponse } from "../../../../../apis/azul/hca-dcp/common/entities";
import {
  ACCESSION_CONFIGS_BY_RESPONSE_KEY,
  IDENTIFIERS_ORG_URL,
} from "./constants";
import {
  Accession,
  AccessionConfig,
  AccessionConfigKeys,
  AccessionsByLabel,
} from "./entities";

/**
 * Group accession configs by the given key.
 * @param groupBy - Keys of accession config object.
 * @param configs - Accession configurations.
 * @returns accession configs grouped by the given key.
 */
export function groupAccessionBy(
  groupBy: AccessionConfigKeys,
  configs: AccessionConfig[]
): Map<string, AccessionConfig> {
  return configs.reduce((accum, config) => {
    accum.set(config[groupBy], config);
    return accum;
  }, new Map<string, AccessionConfig>());
}

/**
 * Convert array of accessions into map keyed by accession namespace.
 * @param accessionsResponse - Project accessions returned in response.
 * @returns map of accessions keyed by accession namespace.
 */
export function mapAccessions(
  accessionsResponse?: AccessionResponse[]
): AccessionsByLabel {
  if (!accessionsResponse) {
    return new Map();
  }
  // Key accessions returned in response by accession label (e.g. Array Express Accessions)
  return accessionsResponse.reduce((accum, accessionResponse) => {
    if (!accessionResponse) {
      return accum;
    }
    const config = ACCESSION_CONFIGS_BY_RESPONSE_KEY.get(
      accessionResponse.namespace
    );
    if (!config) {
      return accum;
    }
    const { label } = config;
    if (!accum.has(label)) {
      accum.set(label, []);
    }
    // Accession is a semi colon-separated (possibly followed by whitespace) string of accession values
    accessionResponse.accession.split(";").forEach((id) => {
      // Add FE-specific model of accession
      const trimmedId = id.trim();
      accum.get(label)?.push({
        id: trimmedId,
        label,
        url: transformAccessionURL(trimmedId, config.identifierOrgPrefix),
      });
    });
    return accum;
  }, new Map<string, Accession[]>());
}

/**
 * Converts the accession into the format ${IDENTIFIERS_ORG_PATH}/${ACCESSION_PATH}:${ACCESSION}.
 * @param accessionId - Accession identifier.
 * @param identifierOrgPrefix - Identifier org prefix.
 * @returns formatted accession URL.
 */
function transformAccessionURL(
  accessionId: string,
  identifierOrgPrefix: string
): string {
  if (!accessionId || !identifierOrgPrefix) {
    return "";
  }
  return `${IDENTIFIERS_ORG_URL}/${identifierOrgPrefix}:${accessionId}`;
}
