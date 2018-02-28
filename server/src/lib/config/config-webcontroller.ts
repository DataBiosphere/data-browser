/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Web controller responsible for handling config-related HTTP/S requests.
 */

// Core dependencies
import { Response as Res } from "express";

// App dependencies
import { Req } from "../../boardwalk";
import { setupResponseCallback } from "cc-express-utils";
import { ConfigViewModel } from "./config-view.model";

/**
 * Handle request for environment config. Default data URL to "https://carlos.ucsc-cgp-dev.org".
 *
 * @param {Req} req
 * @param {Response} res
 */
export function getConfig(req: Req, res: Res): void {

    return setupResponseCallback(res)(null, {
        dataURL: process.env.BW_DATA_URL || "https://carlos.ucsc-cgp-dev.org"
    } as ConfigViewModel);
}
