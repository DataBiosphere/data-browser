import { Observable } from "rxjs/Observable";

export interface Selector<R> {
    <T>(state: Observable<T>): Observable<R>;
}
