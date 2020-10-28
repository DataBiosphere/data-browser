/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of Zendesk support request POST values.
 */

// App dependencies
import { SupportRequestType } from "./support-request-type.model";

export interface SupportRequestPost {

    attachmentToken: string;
    description: string;
    email: string;
    name: string;
    requestedFromUrl: string;
    subject: string;
    type: SupportRequestType;
}
