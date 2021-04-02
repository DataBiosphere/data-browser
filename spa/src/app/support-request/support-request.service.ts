/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating support request functionality.
 */

// Core dependencies
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of, interval } from "rxjs";
import { catchError, map, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../config/config.service";
import { AppState } from "../_ngrx/app.state";
import { SupportRequestPost } from "./support-request-post.model";
import { SupportRequestResponse } from "./support-request-response.model";
import { SupportRequestAPIResponse } from "./support-request-api-response.model";
import { AttachmentResponse } from "./attachment-response.model";
import { AttachmentAPIResponse } from "./attachment-api-response.model";

@Injectable()
export class SupportRequestService {

    // LOCALS
    private static PATH_REQUESTS = "api/v2/requests.json";
    private static PATH_UPLOADS = "api/v2/uploads.json";

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     * @param {Store<AppState>} store
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient, private store: Store<AppState>) {}

    /**
     * Post support request to Zendesk.
     */
    public createSupportRequest(supportRequest: SupportRequestPost): Observable<SupportRequestResponse> {

        // Set up request headers
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        
        const body = {
            request: {
                comment: {
                    body: `${supportRequest.description}\n\n------------------\nSubmitted from: ${supportRequest.requestedFromUrl}`,
                    uploads: [supportRequest.attachmentToken]
                },
                custom_fields: [
                    {id: 360012782111, value: supportRequest.email},
                    {id: 360007369412, value: supportRequest.description},
                    {id: 360007369392, value: supportRequest.subject},
                    {id: 360012744452, value: supportRequest.type}
                ],
                requester: {
                    email: supportRequest.email,
                    name: supportRequest.name
                },
                subject: supportRequest.subject,
                ticket_form_id: 360000932232
            }
        };

        const url = `${this.configService.getZendeskUrl()}/${SupportRequestService.PATH_REQUESTS}`;
        return this.httpClient
            .post<SupportRequestAPIResponse>(url, body, {headers})
            .pipe(
                catchError((e) => {
                    return of({
                        error: true,
                        errorMessage: e.message
                    });
                }),
                map((response: SupportRequestResponse) => {

                    return {
                        id: response.id,
                        error: response.error,
                        errorMessage: response.errorMessage
                    }
                })
            );
    }

    /**
     * Upload file as attachment to request.
     * 
     * @param {File} file
     */
    public uploadAttachment(file: File): Observable<AttachmentResponse> {

        // Set up request headers
        const headers = new HttpHeaders({
            "Content-Type": "application/binary"
        });

        // Set up request params
        const params = new HttpParams().set("filename", file.name);

        const url = `${this.configService.getZendeskUrl()}/${SupportRequestService.PATH_UPLOADS}`;
        return this.httpClient
            .post<AttachmentAPIResponse>(url, file, {headers, params})
            .pipe(
                catchError((e) => {
                    return of({
                        error: true,
                        errorMessage: e.message
                    });
                }),
                map((response: AttachmentAPIResponse) => {

                    const upload = response.upload;
                    return {
                        attachmentName: upload?.attachment?.file_name,
                        error: response.error,
                        errorMessage: response.errorMessage,
                        token: upload?.token
                    };
                })
            );
    }
}
