import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CrawlerUsernameSetForAg } from './crawler-username-set-for-ag.model';
import { CrawlerUsernameSetForAgPopupService } from './crawler-username-set-for-ag-popup.service';
import { CrawlerUsernameSetForAgService } from './crawler-username-set-for-ag.service';
import { CrawlerSubscriptionForAg, CrawlerSubscriptionForAgService } from '../crawler-subscription-for-ag';

@Component({
    selector: 'jhi-crawler-username-set-for-ag-dialog',
    templateUrl: './crawler-username-set-for-ag-dialog.component.html'
})
export class CrawlerUsernameSetForAgDialogComponent implements OnInit {

    crawlerUsernameSet: CrawlerUsernameSetForAg;
    isSaving: boolean;

    crawlersubscriptions: CrawlerSubscriptionForAg[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private crawlerUsernameSetService: CrawlerUsernameSetForAgService,
        private crawlerSubscriptionService: CrawlerSubscriptionForAgService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.crawlerSubscriptionService.query()
            .subscribe((res: HttpResponse<CrawlerSubscriptionForAg[]>) => { this.crawlersubscriptions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.crawlerUsernameSet.id !== undefined) {
            this.subscribeToSaveResponse(
                this.crawlerUsernameSetService.update(this.crawlerUsernameSet));
        } else {
            this.subscribeToSaveResponse(
                this.crawlerUsernameSetService.create(this.crawlerUsernameSet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CrawlerUsernameSetForAg>>) {
        result.subscribe((res: HttpResponse<CrawlerUsernameSetForAg>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CrawlerUsernameSetForAg) {
        this.eventManager.broadcast({ name: 'crawlerUsernameSetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCrawlerSubscriptionById(index: number, item: CrawlerSubscriptionForAg) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-crawler-username-set-for-ag-popup',
    template: ''
})
export class CrawlerUsernameSetForAgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private crawlerUsernameSetPopupService: CrawlerUsernameSetForAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.crawlerUsernameSetPopupService
                    .open(CrawlerUsernameSetForAgDialogComponent as Component, params['id']);
            } else {
                this.crawlerUsernameSetPopupService
                    .open(CrawlerUsernameSetForAgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
