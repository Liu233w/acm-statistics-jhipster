import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { HistoryForAg } from './history-for-ag.model';
import { HistoryForAgService } from './history-for-ag.service';

@Component({
    selector: 'jhi-history-for-ag-detail',
    templateUrl: './history-for-ag-detail.component.html'
})
export class HistoryForAgDetailComponent implements OnInit, OnDestroy {

    history: HistoryForAg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private historyService: HistoryForAgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHistories();
    }

    load(id) {
        this.historyService.find(id)
            .subscribe((historyResponse: HttpResponse<HistoryForAg>) => {
                this.history = historyResponse.body;
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

    registerChangeInHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'historyListModification',
            (response) => this.load(this.history.id)
        );
    }
}
