import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CrawlerSubscriptionForAg } from './crawler-subscription-for-ag.model';
import { CrawlerSubscriptionForAgPopupService } from './crawler-subscription-for-ag-popup.service';
import { CrawlerSubscriptionForAgService } from './crawler-subscription-for-ag.service';

@Component({
    selector: 'jhi-crawler-subscription-for-ag-delete-dialog',
    templateUrl: './crawler-subscription-for-ag-delete-dialog.component.html'
})
export class CrawlerSubscriptionForAgDeleteDialogComponent {

    crawlerSubscription: CrawlerSubscriptionForAg;

    constructor(
        private crawlerSubscriptionService: CrawlerSubscriptionForAgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.crawlerSubscriptionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'crawlerSubscriptionListModification',
                content: 'Deleted an crawlerSubscription'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-crawler-subscription-for-ag-delete-popup',
    template: ''
})
export class CrawlerSubscriptionForAgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private crawlerSubscriptionPopupService: CrawlerSubscriptionForAgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.crawlerSubscriptionPopupService
                .open(CrawlerSubscriptionForAgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
