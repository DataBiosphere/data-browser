/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * DI token used when injecting instance of site config service for the current environment.
 */

// Core dependencies
import { InjectionToken } from "@angular/core";

export const SITE_CONFIG_SERVICE = new InjectionToken<string>("SITE_CONFIG_SERVICE");
