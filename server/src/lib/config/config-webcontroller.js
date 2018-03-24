"use strict";
/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Web controller responsible for handling config-related HTTP/S requests.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var cc_express_utils_1 = require("cc-express-utils");
/**
 * Handle request for environment config. Default data URL to "https://carlos.ucsc-cgp-dev.org".
 *
 * @param {Req} req
 * @param {Response} res
 */
function getConfig(req, res) {
    return cc_express_utils_1.setupResponseCallback(res)(null, {
        dataURL: process.env.BW_DATA_URL || "https://carlos.ucsc-cgp-dev.org"
    });
}
exports.getConfig = getConfig;
