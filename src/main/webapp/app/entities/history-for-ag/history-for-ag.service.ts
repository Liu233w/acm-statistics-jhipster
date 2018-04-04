import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { HistoryForAg } from './history-for-ag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<HistoryForAg>;

@Injectable()
export class HistoryForAgService {

    private resourceUrl =  SERVER_API_URL + 'api/histories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(history: HistoryForAg): Observable<EntityResponseType> {
        const copy = this.convert(history);
        return this.http.post<HistoryForAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(history: HistoryForAg): Observable<EntityResponseType> {
        const copy = this.convert(history);
        return this.http.put<HistoryForAg>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<HistoryForAg>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<HistoryForAg[]>> {
        const options = createRequestOption(req);
        return this.http.get<HistoryForAg[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<HistoryForAg[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: HistoryForAg = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<HistoryForAg[]>): HttpResponse<HistoryForAg[]> {
        const jsonResponse: HistoryForAg[] = res.body;
        const body: HistoryForAg[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to HistoryForAg.
     */
    private convertItemFromServer(history: HistoryForAg): HistoryForAg {
        const copy: HistoryForAg = Object.assign({}, history);
        copy.queryTime = this.dateUtils
            .convertDateTimeFromServer(history.queryTime);
        return copy;
    }

    /**
     * Convert a HistoryForAg to a JSON which can be sent to the server.
     */
    private convert(history: HistoryForAg): HistoryForAg {
        const copy: HistoryForAg = Object.assign({}, history);

        copy.queryTime = this.dateUtils.toDate(history.queryTime);
        return copy;
    }
}
