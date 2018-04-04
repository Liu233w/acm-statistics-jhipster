import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CrawlerSubscriptionForAg } from './crawler-subscription-for-ag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CrawlerSubscriptionForAg>;

@Injectable()
export class CrawlerSubscriptionForAgService {

    private resourceUrl =  SERVER_API_URL + 'api/crawler-subscriptions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(crawlerSubscription: CrawlerSubscriptionForAg): Observable<EntityResponseType> {
        const copy = this.convert(crawlerSubscription);
        return this.http.post<CrawlerSubscriptionForAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(crawlerSubscription: CrawlerSubscriptionForAg): Observable<EntityResponseType> {
        const copy = this.convert(crawlerSubscription);
        return this.http.put<CrawlerSubscriptionForAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CrawlerSubscriptionForAg>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CrawlerSubscriptionForAg[]>> {
        const options = createRequestOption(req);
        return this.http.get<CrawlerSubscriptionForAg[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CrawlerSubscriptionForAg[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CrawlerSubscriptionForAg = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CrawlerSubscriptionForAg[]>): HttpResponse<CrawlerSubscriptionForAg[]> {
        const jsonResponse: CrawlerSubscriptionForAg[] = res.body;
        const body: CrawlerSubscriptionForAg[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CrawlerSubscriptionForAg.
     */
    private convertItemFromServer(crawlerSubscription: CrawlerSubscriptionForAg): CrawlerSubscriptionForAg {
        const copy: CrawlerSubscriptionForAg = Object.assign({}, crawlerSubscription);
        copy.createTime = this.dateUtils
            .convertDateTimeFromServer(crawlerSubscription.createTime);
        return copy;
    }

    /**
     * Convert a CrawlerSubscriptionForAg to a JSON which can be sent to the server.
     */
    private convert(crawlerSubscription: CrawlerSubscriptionForAg): CrawlerSubscriptionForAg {
        const copy: CrawlerSubscriptionForAg = Object.assign({}, crawlerSubscription);

        copy.createTime = this.dateUtils.toDate(crawlerSubscription.createTime);
        return copy;
    }
}
