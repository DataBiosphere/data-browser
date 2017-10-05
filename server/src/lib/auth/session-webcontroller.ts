/**
 * Session Web Controller
 */
/**
 * Types
 */
import { Response as Res } from "express";
import { Req } from "../../boardwalk";

/**
 * Dependencies
 */
import * as personService from "../person/person-service";
import { setupResponseCallback } from "cc-express-utils";

/**
 * Get Session With Bearer
 *
 * @param {Req} req
 * @param {"~express/lib/express".createApplication.Response} res
 */
export function getSession(req: Req, res: Res) {

  //  const sessionCookie = req.cookies["session"] || ".eJwdz8tOg0AUgOFXMWfNAkZptIkLGiiiziElw-XMhiCiw9SJhktapum7l7j_F99_gfpr6EYF22mYOwfq_hO2F7j7gC3wOGdoEsYFndM40ySShawynHFP6mBBxn1kmUFDDENy07DQaOURRaG4iFyMs37t7qWhkwx3ikzkoT0wsoVC0VoZ5wsvuS_D4EGKw5l066OWPzyMXKmLXop9L02myH4vacltGic-icCTJj-ReD2iWR2i0GSDZ7g68NvMk6rHqZm6VT_FT-OmEtH7_u3v5bGp-qrcJKwZ5h1zWwMOzGM3_O8Cg-sNlK5WLw.DKrYHw.VcptDBfjHyMIvZL559M-Wxidrmg"
    const sessionCookie = req.cookies["session"];
    if (!sessionCookie) {
        return res.status(200).json({});
    }

    personService.getUserFromSessionCookie(sessionCookie, setupResponseCallback(res));
}