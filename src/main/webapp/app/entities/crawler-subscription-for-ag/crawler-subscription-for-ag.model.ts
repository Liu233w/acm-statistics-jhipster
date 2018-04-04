import { BaseEntity } from './../../shared';

export const enum MailPeriod {
    'DAILY',
    'WEEKLY',
    'MONTHLY'
}

export class CrawlerSubscriptionForAg implements BaseEntity {
    constructor(
        public id?: number,
        public createTime?: any,
        public period?: MailPeriod,
        public crawlerUsernameSetIdId?: number,
    ) {
    }
}
