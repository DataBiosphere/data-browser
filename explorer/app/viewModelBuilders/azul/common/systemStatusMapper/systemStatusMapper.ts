import {
  INDEXING_STATUS,
  SystemStatusResponse,
} from "@databiosphere/findable-ui/lib/providers/systemStatus";
import { IndexHttpResponse } from "./entities";

/**
 * Normalize system status response.
 * @param response - HTTP response.
 * @returns normalized system status response.
 */
export function bindSystemStatusResponse(
  response?: IndexHttpResponse
): SystemStatusResponse | undefined {
  if (!response) return;
  return {
    indexing: isIndexing(response),
    indexingStatus: INDEXING_STATUS.COMPLETE,
    ok: response.up,
  };
}

/**
 * Returns true if the system is currently indexing.
 * @param response - HTTP response.
 * @returns true if the system is currently indexing.
 */
function isIndexing(response: IndexHttpResponse): boolean {
  return (
    response.progress.unindexed_bundles > 0 ||
    response.progress.unindexed_documents > 0
  );
}
