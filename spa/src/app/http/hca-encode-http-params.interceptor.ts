/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * HTTP encoder, specifically used to encode +.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpParams,
    HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

// App dependencies
import { HCAHttpParameterCodec } from "./hca-http-parameter-codec";

@Injectable()
export class HCAEncodeHttpParamsInterceptor implements HttpInterceptor {

    /**
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const params = new HttpParams({encoder: new HCAHttpParameterCodec(), fromString: req.params.toString()});
        return next.handle(req.clone({params}));
    }
}
