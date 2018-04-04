import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CrawlerSubscriptionForAg } from './crawler-subscription-for-ag.model';
import { CrawlerSubscriptionForAgService } from './crawler-subscription-for-ag.service';

@Component({
    selector: 'jhi-crawler-subscription-for-ag-detail',
    templateUrl: './crawler-subscription-for-ag-detail.component.html'
})
export class CrawlerSubscriptionForAgDetailComponent implements OnInit, OnDestroy {

    crawlerSubscription: CrawlerSubscriptionForAg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private crawlerSubscriptionService: CrawlerSubscriptionForAgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCrawlerSubscriptions();
    }

    load(id) {
        this.crawlerSubscriptionService.find(id)
            .subscribe((crawlerSubscriptionResponse: HttpResponse<CrawlerSubscriptionForAg>) => {
                this.crawlerSubscription = crawlerSubscriptionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCrawlerSubscriptions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'crawlerSubscriptionListModification',
            (response) => this.load(this.crawlerSubscription.id)
        );
    }
}
