import { EXPORTS } from "./constants";
import { ROUTES } from "./routes";

/**
 * Returns true if the route is a platform export whose platform has no import endpoint.
 * @param route - Export method route, e.g. "/export/cavatica".
 * @returns true if the route is a platform export without an import endpoint.
 */
export function isUnavailablePlatformExportRoute(route: string): boolean {
  return Object.entries(ROUTES).some(
    ([key, path]) =>
      path === route && key in EXPORTS && !EXPORTS[key].platformImport
  );
}
