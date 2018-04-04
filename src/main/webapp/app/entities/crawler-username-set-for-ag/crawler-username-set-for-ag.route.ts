import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CrawlerUsernameSetForAgComponent } from './crawler-username-set-for-ag.component';
import { CrawlerUsernameSetForAgDetailComponent } from './crawler-username-set-for-ag-detail.component';
import { CrawlerUsernameSetForAgPopupComponent } from './crawler-username-set-for-ag-dialog.component';
import { CrawlerUsernameSetForAgDeletePopupComponent } from './crawler-username-set-for-ag-delete-dialog.component';

@Injectable()
export class CrawlerUsernameSetForAgResolvePagingParams implements Resolve<any> {

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

export const crawlerUsernameSetRoute: Routes = [
    {
        path: 'crawler-username-set-for-ag',
        component: CrawlerUsernameSetForAgComponent,
        resolve: {
            'pagingParams': CrawlerUsernameSetForAgResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerUsernameSets'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'crawler-username-set-for-ag/:id',
        component: CrawlerUsernameSetForAgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerUsernameSets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const crawlerUsernameSetPopupRoute: Routes = [
    {
        path: 'crawler-username-set-for-ag-new',
        component: CrawlerUsernameSetForAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerUsernameSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'crawler-username-set-for-ag/:id/edit',
        component: CrawlerUsernameSetForAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerUsernameSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'crawler-username-set-for-ag/:id/delete',
        component: CrawlerUsernameSetForAgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CrawlerUsernameSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
