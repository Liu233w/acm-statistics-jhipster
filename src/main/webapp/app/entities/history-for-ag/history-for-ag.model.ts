import { BaseEntity } from './../../shared';

export class HistoryForAg implements BaseEntity {
    constructor(
        public id?: number,
        public submission?: number,
        public solved?: number,
        public detail?: any,
        public queryTime?: any,
        public usernames?: any,
        public userId?: number,
    ) {
    }
}
