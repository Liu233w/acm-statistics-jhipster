import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { HistoryForAg } from './history-for-ag.model';
import { HistoryForAgPopupService } from './history-for-ag-popup.service';
import { HistoryForAgService } from './history-for-ag.service';

@Component({
    selector: 'jhi-history-for-ag-dialog',
    templateUrl: './history-for-ag-dialog.component.html'
})
export class HistoryForAgDialogComponent implements OnInit {

    history: HistoryForAg;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private historyService: HistoryForAgService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        if (this.history.id !== undefined) {
            this.subscribeToSaveResponse(
                this.historyService.update(this.history));
        } else {
            this.subscribeToSaveResponse(
                this.historyService.create(this.history));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<HistoryForAg>>) {
        result.subscribe((res: HttpResponse<HistoryForAg>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: HistoryForAg) {
        this.eventManager.broadcast({ name: 'historyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-history-for-ag-popup',
    template: ''
})
export class HistoryForAgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private historyPopupService: HistoryForAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.historyPopupService
                    .open(HistoryForAgDialogComponent as Component, params['id']);
            } else {
                this.historyPopupService
                    .open(HistoryForAgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
