/**
 * Web controller for person-related CRUD functionality
 */
/**
 * Types
 */
import { Response as Res } from "express";
import { Req } from "../../boardwalk";

/**
 * Dependencies
 */
import { setupResponseCallback } from "cc-express-utils";

/**
 * Services
 */
import * as personService from "./person-service";
import { Person } from "./person";

/**
 * Models
 */

export function getRedwoodToken(req: Req, res: Res): void {

    const sessionCookie = req.cookies["session"] || ".eJwdz8tOg0AUgOFXMWfNAkZptIkLGiiiziElw-XMhiCiw9SJhktapum7l7j_F99_gfpr6EYF22mYOwfq_hO2F7j7gC3wOGdoEsYFndM40ySShawynHFP6mBBxn1kmUFDDENy07DQaOURRaG4iFyMs37t7qWhkwx3ikzkoT0wsoVC0VoZ5wsvuS_D4EGKw5l066OWPzyMXKmLXop9L02myH4vacltGic-icCTJj-ReD2iWR2i0GSDZ7g68NvMk6rHqZm6VT_FT-OmEtH7_u3v5bGp-qrcJKwZ5h1zWwMOzGM3_O8Cg-sNlK5WLw.DKrYHw.VcptDBfjHyMIvZL559M-Wxidrmg";

    personService.getUserFromSessionCookie(sessionCookie, (error, user: Person) => {

        if (error) {
            return setupResponseCallback(res)(error);
        }
        res.setHeader("Content-Disposition", "attachment; filename=redwood_token.txt");
        res.setHeader("Content-Type", "text/html");
        res.send(user.redwood_token);
    });
}
