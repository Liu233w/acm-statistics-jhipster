import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AcmStatisticsJhipsterSharedModule } from '../../shared';
import {
    CrawlerSubscriptionForAgService,
    CrawlerSubscriptionForAgPopupService,
    CrawlerSubscriptionForAgComponent,
    CrawlerSubscriptionForAgDetailComponent,
    CrawlerSubscriptionForAgDialogComponent,
    CrawlerSubscriptionForAgPopupComponent,
    CrawlerSubscriptionForAgDeletePopupComponent,
    CrawlerSubscriptionForAgDeleteDialogComponent,
    crawlerSubscriptionRoute,
    crawlerSubscriptionPopupRoute,
    CrawlerSubscriptionForAgResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...crawlerSubscriptionRoute,
    ...crawlerSubscriptionPopupRoute,
];

@NgModule({
    imports: [
        AcmStatisticsJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CrawlerSubscriptionForAgComponent,
        CrawlerSubscriptionForAgDetailComponent,
        CrawlerSubscriptionForAgDialogComponent,
        CrawlerSubscriptionForAgDeleteDialogComponent,
        CrawlerSubscriptionForAgPopupComponent,
        CrawlerSubscriptionForAgDeletePopupComponent,
    ],
    entryComponents: [
        CrawlerSubscriptionForAgComponent,
        CrawlerSubscriptionForAgDialogComponent,
        CrawlerSubscriptionForAgPopupComponent,
        CrawlerSubscriptionForAgDeleteDialogComponent,
        CrawlerSubscriptionForAgDeletePopupComponent,
    ],
    providers: [
        CrawlerSubscriptionForAgService,
        CrawlerSubscriptionForAgPopupService,
        CrawlerSubscriptionForAgResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcmStatisticsJhipsterCrawlerSubscriptionForAgModule {}
