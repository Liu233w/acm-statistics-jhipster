import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HistoryForAg } from './history-for-ag.model';
import { HistoryForAgPopupService } from './history-for-ag-popup.service';
import { HistoryForAgService } from './history-for-ag.service';

@Component({
    selector: 'jhi-history-for-ag-delete-dialog',
    templateUrl: './history-for-ag-delete-dialog.component.html'
})
export class HistoryForAgDeleteDialogComponent {

    history: HistoryForAg;

    constructor(
        private historyService: HistoryForAgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.historyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'historyListModification',
                content: 'Deleted an history'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-history-for-ag-delete-popup',
    template: ''
})
export class HistoryForAgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private historyPopupService: HistoryForAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.historyPopupService
                .open(HistoryForAgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
