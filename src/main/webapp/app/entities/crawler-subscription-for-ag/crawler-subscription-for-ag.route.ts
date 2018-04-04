import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CrawlerSubscriptionForAgComponent } from './crawler-subscription-for-ag.component';
import { CrawlerSubscriptionForAgDetailComponent } from './crawler-subscription-for-ag-detail.component';
import { CrawlerSubscriptionForAgPopupComponent } from './crawler-subscription-for-ag-dialog.component';
import { CrawlerSubscriptionForAgDeletePopupComponent } from './crawler-subscription-for-ag-delete-dialog.component';

@Injectable()
export class CrawlerSubscriptionForAgResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const crawlerSubscriptionRoute: Routes = [
    {
        path: 'crawler-subscription-for-ag',
        component: CrawlerSubscriptionForAgComponent,
        resolve: {
            'pagingParams': CrawlerSubscriptionForAgResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'crawler-subscription-for-ag/:id',
        component: CrawlerSubscriptionForAgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerSubscriptions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const crawlerSubscriptionPopupRoute: Routes = [
    {
        path: 'crawler-subscription-for-ag-new',
        component: CrawlerSubscriptionForAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'crawler-subscription-for-ag/:id/edit',
        component: CrawlerSubscriptionForAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'crawler-subscription-for-ag/:id/delete',
        component: CrawlerSubscriptionForAgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerSubscriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
