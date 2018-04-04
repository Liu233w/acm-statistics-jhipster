import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CrawlerUsernameSetForAg } from './crawler-username-set-for-ag.model';
import { CrawlerUsernameSetForAgService } from './crawler-username-set-for-ag.service';

@Injectable()
export class CrawlerUsernameSetForAgPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private crawlerUsernameSetService: CrawlerUsernameSetForAgService

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
                this.crawlerUsernameSetService.find(id)
                    .subscribe((crawlerUsernameSetResponse: HttpResponse<CrawlerUsernameSetForAg>) => {
                        const crawlerUsernameSet: CrawlerUsernameSetForAg = crawlerUsernameSetResponse.body;
                        this.ngbModalRef = this.crawlerUsernameSetModalRef(component, crawlerUsernameSet);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.crawlerUsernameSetModalRef(component, new CrawlerUsernameSetForAg());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    crawlerUsernameSetModalRef(component: Component, crawlerUsernameSet: CrawlerUsernameSetForAg): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.crawlerUsernameSet = crawlerUsernameSet;
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
