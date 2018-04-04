import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CrawlerUsernameSetForAg } from './crawler-username-set-for-ag.model';
import { CrawlerUsernameSetForAgService } from './crawler-username-set-for-ag.service';

@Component({
    selector: 'jhi-crawler-username-set-for-ag-detail',
    templateUrl: './crawler-username-set-for-ag-detail.component.html'
})
export class CrawlerUsernameSetForAgDetailComponent implements OnInit, OnDestroy {

    crawlerUsernameSet: CrawlerUsernameSetForAg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private crawlerUsernameSetService: CrawlerUsernameSetForAgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCrawlerUsernameSets();
    }

    load(id) {
        this.crawlerUsernameSetService.find(id)
            .subscribe((crawlerUsernameSetResponse: HttpResponse<CrawlerUsernameSetForAg>) => {
                this.crawlerUsernameSet = crawlerUsernameSetResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCrawlerUsernameSets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'crawlerUsernameSetListModification',
            (response) => this.load(this.crawlerUsernameSet.id)
        );
    }
}
