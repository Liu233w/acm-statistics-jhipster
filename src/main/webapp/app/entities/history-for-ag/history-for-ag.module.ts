import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AcmStatisticsJhipsterSharedModule } from '../../shared';
import {
    HistoryForAgService,
    HistoryForAgPopupService,
    HistoryForAgComponent,
    HistoryForAgDetailComponent,
    HistoryForAgDialogComponent,
    HistoryForAgPopupComponent,
    HistoryForAgDeletePopupComponent,
    HistoryForAgDeleteDialogComponent,
    historyRoute,
    historyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...historyRoute,
    ...historyPopupRoute,
];

@NgModule({
    imports: [
        AcmStatisticsJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HistoryForAgComponent,
        HistoryForAgDetailComponent,
        HistoryForAgDialogComponent,
        HistoryForAgDeleteDialogComponent,
        HistoryForAgPopupComponent,
        HistoryForAgDeletePopupComponent,
    ],
    entryComponents: [
        HistoryForAgComponent,
        HistoryForAgDialogComponent,
        HistoryForAgPopupComponent,
        HistoryForAgDeleteDialogComponent,
        HistoryForAgDeletePopupComponent,
    ],
    providers: [
        HistoryForAgService,
        HistoryForAgPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcmStatisticsJhipsterHistoryForAgModule {}
