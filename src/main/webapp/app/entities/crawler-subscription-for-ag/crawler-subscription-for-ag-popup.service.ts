import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CrawlerSubscriptionForAg } from './crawler-subscription-for-ag.model';
import { CrawlerSubscriptionForAgService } from './crawler-subscription-for-ag.service';

@Injectable()
export class CrawlerSubscriptionForAgPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private crawlerSubscriptionService: CrawlerSubscriptionForAgService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.crawlerSubscriptionService.find(id)
                    .subscribe((crawlerSubscriptionResponse: HttpResponse<CrawlerSubscriptionForAg>) => {
                        const crawlerSubscription: CrawlerSubscriptionForAg = crawlerSubscriptionResponse.body;
                        crawlerSubscription.createTime = this.datePipe
                            .transform(crawlerSubscription.createTime, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.crawlerSubscriptionModalRef(component, crawlerSubscription);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.crawlerSubscriptionModalRef(component, new CrawlerSubscriptionForAg());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    crawlerSubscriptionModalRef(component: Component, crawlerSubscription: CrawlerSubscriptionForAg): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.crawlerSubscription = crawlerSubscription;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
