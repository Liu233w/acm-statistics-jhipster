import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CrawlerUsernameSetForAg } from './crawler-username-set-for-ag.model';
import { CrawlerUsernameSetForAgPopupService } from './crawler-username-set-for-ag-popup.service';
import { CrawlerUsernameSetForAgService } from './crawler-username-set-for-ag.service';

@Component({
    selector: 'jhi-crawler-username-set-for-ag-delete-dialog',
    templateUrl: './crawler-username-set-for-ag-delete-dialog.component.html'
})
export class CrawlerUsernameSetForAgDeleteDialogComponent {

    crawlerUsernameSet: CrawlerUsernameSetForAg;

    constructor(
        private crawlerUsernameSetService: CrawlerUsernameSetForAgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.crawlerUsernameSetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'crawlerUsernameSetListModification',
                content: 'Deleted an crawlerUsernameSet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-crawler-username-set-for-ag-delete-popup',
    template: ''
})
export class CrawlerUsernameSetForAgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private crawlerUsernameSetPopupService: CrawlerUsernameSetForAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.crawlerUsernameSetPopupService
                .open(CrawlerUsernameSetForAgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
