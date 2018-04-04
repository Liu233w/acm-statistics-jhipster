import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CrawlerUsernameSetForAg } from './crawler-username-set-for-ag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CrawlerUsernameSetForAg>;

@Injectable()
export class CrawlerUsernameSetForAgService {

    private resourceUrl =  SERVER_API_URL + 'api/crawler-username-sets';

    constructor(private http: HttpClient) { }

    create(crawlerUsernameSet: CrawlerUsernameSetForAg): Observable<EntityResponseType> {
        const copy = this.convert(crawlerUsernameSet);
        return this.http.post<CrawlerUsernameSetForAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(crawlerUsernameSet: CrawlerUsernameSetForAg): Observable<EntityResponseType> {
        const copy = this.convert(crawlerUsernameSet);
        return this.http.put<CrawlerUsernameSetForAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CrawlerUsernameSetForAg>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CrawlerUsernameSetForAg[]>> {
        const options = createRequestOption(req);
        return this.http.get<CrawlerUsernameSetForAg[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CrawlerUsernameSetForAg[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CrawlerUsernameSetForAg = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CrawlerUsernameSetForAg[]>): HttpResponse<CrawlerUsernameSetForAg[]> {
        const jsonResponse: CrawlerUsernameSetForAg[] = res.body;
        const body: CrawlerUsernameSetForAg[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CrawlerUsernameSetForAg.
     */
    private convertItemFromServer(crawlerUsernameSet: CrawlerUsernameSetForAg): CrawlerUsernameSetForAg {
        const copy: CrawlerUsernameSetForAg = Object.assign({}, crawlerUsernameSet);
        return copy;
    }

    /**
     * Convert a CrawlerUsernameSetForAg to a JSON which can be sent to the server.
     */
    private convert(crawlerUsernameSet: CrawlerUsernameSetForAg): CrawlerUsernameSetForAg {
        const copy: CrawlerUsernameSetForAg = Object.assign({}, crawlerUsernameSet);
        return copy;
    }
}
