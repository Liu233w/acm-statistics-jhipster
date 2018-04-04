import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HistoryForAg } from './history-for-ag.model';
import { HistoryForAgService } from './history-for-ag.service';

@Injectable()
export class HistoryForAgPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private historyService: HistoryForAgService

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
                this.historyService.find(id)
                    .subscribe((historyResponse: HttpResponse<HistoryForAg>) => {
                        const history: HistoryForAg = historyResponse.body;
                        history.queryTime = this.datePipe
                            .transform(history.queryTime, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.historyModalRef(component, history);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.historyModalRef(component, new HistoryForAg());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    historyModalRef(component: Component, history: HistoryForAg): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.history = history;
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
