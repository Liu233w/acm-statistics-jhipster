import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AcmStatisticsJhipsterCrawlerUsernameSetForAgModule } from './crawler-username-set-for-ag/crawler-username-set-for-ag.module';
import { AcmStatisticsJhipsterCrawlerSubscriptionForAgModule } from './crawler-subscription-for-ag/crawler-subscription-for-ag.module';
import { AcmStatisticsJhipsterHistoryForAgModule } from './history-for-ag/history-for-ag.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AcmStatisticsJhipsterCrawlerUsernameSetForAgModule,
        AcmStatisticsJhipsterCrawlerSubscriptionForAgModule,
        AcmStatisticsJhipsterHistoryForAgModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcmStatisticsJhipsterEntityModule {}
