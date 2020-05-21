/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HTTP encoder, specifically used to encode +.
 */
import { HttpParameterCodec } from "@angular/common/http";

export class HCAHttpParameterCodec implements HttpParameterCodec {

    /**
     * @param {string} key
     * @returns {string}
     */
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }

    /**
     * @param {string} value
     * @returns {string}
     */
    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }

    /**
     * @param {string} key
     * @returns {string}
     */
    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }

    /**
     * @param {string} value
     * @returns {string}
     */
    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}
