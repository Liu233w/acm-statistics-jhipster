/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { CrawlerSubscriptionForAgDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag-delete-dialog.component';
import { CrawlerSubscriptionForAgService } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag.service';

describe('Component Tests', () => {

    describe('CrawlerSubscriptionForAg Management Delete Component', () => {
        let comp: CrawlerSubscriptionForAgDeleteDialogComponent;
        let fixture: ComponentFixture<CrawlerSubscriptionForAgDeleteDialogComponent>;
        let service: CrawlerSubscriptionForAgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [CrawlerSubscriptionForAgDeleteDialogComponent],
                providers: [
                    CrawlerSubscriptionForAgService
                ]
            })
            .overrideTemplate(CrawlerSubscriptionForAgDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CrawlerSubscriptionForAgDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CrawlerSubscriptionForAgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
