import { BaseEntity } from './../../shared';

export class CrawlerUsernameSetForAg implements BaseEntity {
    constructor(
        public id?: number,
        public usernames?: any,
        public title?: string,
        public userId?: number,
        public subscriptionIdId?: number,
    ) {
    }
}
