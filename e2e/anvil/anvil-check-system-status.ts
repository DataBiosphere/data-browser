import { checkIsIndexing } from "../checkIsIndexing";
const ANVIL_CMG_SYSTEM_STATUS_URL =
  "https://service.anvil.gi.ucsc.edu/health/progress";

/**
 * Check system status for Anvil-CMG
 */
async function anvilCheckIsIndexing(): Promise<void> {
  await checkIsIndexing(ANVIL_CMG_SYSTEM_STATUS_URL);
}

anvilCheckIsIndexing();
