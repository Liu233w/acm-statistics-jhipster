import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AcmStatisticsJhipsterSharedModule } from '../../shared';
import {
    CrawlerUsernameSetForAgService,
    CrawlerUsernameSetForAgPopupService,
    CrawlerUsernameSetForAgComponent,
    CrawlerUsernameSetForAgDetailComponent,
    CrawlerUsernameSetForAgDialogComponent,
    CrawlerUsernameSetForAgPopupComponent,
    CrawlerUsernameSetForAgDeletePopupComponent,
    CrawlerUsernameSetForAgDeleteDialogComponent,
    crawlerUsernameSetRoute,
    crawlerUsernameSetPopupRoute,
    CrawlerUsernameSetForAgResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...crawlerUsernameSetRoute,
    ...crawlerUsernameSetPopupRoute,
];

@NgModule({
    imports: [
        AcmStatisticsJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CrawlerUsernameSetForAgComponent,
        CrawlerUsernameSetForAgDetailComponent,
        CrawlerUsernameSetForAgDialogComponent,
        CrawlerUsernameSetForAgDeleteDialogComponent,
        CrawlerUsernameSetForAgPopupComponent,
        CrawlerUsernameSetForAgDeletePopupComponent,
    ],
    entryComponents: [
        CrawlerUsernameSetForAgComponent,
        CrawlerUsernameSetForAgDialogComponent,
        CrawlerUsernameSetForAgPopupComponent,
        CrawlerUsernameSetForAgDeleteDialogComponent,
        CrawlerUsernameSetForAgDeletePopupComponent,
    ],
    providers: [
        CrawlerUsernameSetForAgService,
        CrawlerUsernameSetForAgPopupService,
        CrawlerUsernameSetForAgResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcmStatisticsJhipsterCrawlerUsernameSetForAgModule {}
