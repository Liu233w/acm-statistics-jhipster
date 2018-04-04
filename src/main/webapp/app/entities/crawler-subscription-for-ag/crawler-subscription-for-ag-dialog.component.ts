import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CrawlerSubscriptionForAg } from './crawler-subscription-for-ag.model';
import { CrawlerSubscriptionForAgPopupService } from './crawler-subscription-for-ag-popup.service';
import { CrawlerSubscriptionForAgService } from './crawler-subscription-for-ag.service';
import { CrawlerUsernameSetForAg, CrawlerUsernameSetForAgService } from '../crawler-username-set-for-ag';

@Component({
    selector: 'jhi-crawler-subscription-for-ag-dialog',
    templateUrl: './crawler-subscription-for-ag-dialog.component.html'
})
export class CrawlerSubscriptionForAgDialogComponent implements OnInit {

    crawlerSubscription: CrawlerSubscriptionForAg;
    isSaving: boolean;

    crawlerusernamesetids: CrawlerUsernameSetForAg[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private crawlerSubscriptionService: CrawlerSubscriptionForAgService,
        private crawlerUsernameSetService: CrawlerUsernameSetForAgService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.crawlerUsernameSetService
            .query({filter: 'subscriptionid-is-null'})
            .subscribe((res: HttpResponse<CrawlerUsernameSetForAg[]>) => {
                if (!this.crawlerSubscription.crawlerUsernameSetIdId) {
                    this.crawlerusernamesetids = res.body;
                } else {
                    this.crawlerUsernameSetService
                        .find(this.crawlerSubscription.crawlerUsernameSetIdId)
                        .subscribe((subRes: HttpResponse<CrawlerUsernameSetForAg>) => {
                            this.crawlerusernamesetids = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.crawlerSubscription.id !== undefined) {
            this.subscribeToSaveResponse(
                this.crawlerSubscriptionService.update(this.crawlerSubscription));
        } else {
            this.subscribeToSaveResponse(
                this.crawlerSubscriptionService.create(this.crawlerSubscription));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CrawlerSubscriptionForAg>>) {
        result.subscribe((res: HttpResponse<CrawlerSubscriptionForAg>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CrawlerSubscriptionForAg) {
        this.eventManager.broadcast({ name: 'crawlerSubscriptionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCrawlerUsernameSetById(index: number, item: CrawlerUsernameSetForAg) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-crawler-subscription-for-ag-popup',
    template: ''
})
export class CrawlerSubscriptionForAgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private crawlerSubscriptionPopupService: CrawlerSubscriptionForAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.crawlerSubscriptionPopupService
                    .open(CrawlerSubscriptionForAgDialogComponent as Component, params['id']);
            } else {
                this.crawlerSubscriptionPopupService
                    .open(CrawlerSubscriptionForAgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
