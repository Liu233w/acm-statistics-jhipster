import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { HistoryForAgComponent } from './history-for-ag.component';
import { HistoryForAgDetailComponent } from './history-for-ag-detail.component';
import { HistoryForAgPopupComponent } from './history-for-ag-dialog.component';
import { HistoryForAgDeletePopupComponent } from './history-for-ag-delete-dialog.component';

export const historyRoute: Routes = [
    {
        path: 'history-for-ag',
        component: HistoryForAgComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'history-for-ag/:id',
        component: HistoryForAgDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const historyPopupRoute: Routes = [
    {
        path: 'history-for-ag-new',
        component: HistoryForAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'history-for-ag/:id/edit',
        component: HistoryForAgPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'history-for-ag/:id/delete',
        component: HistoryForAgDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Histories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
