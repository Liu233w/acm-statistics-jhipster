/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { CrawlerSubscriptionForAgDialogComponent } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag-dialog.component';
import { CrawlerSubscriptionForAgService } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag.service';
import { CrawlerSubscriptionForAg } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag.model';
import { CrawlerUsernameSetForAgService } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag';

describe('Component Tests', () => {

    describe('CrawlerSubscriptionForAg Management Dialog Component', () => {
        let comp: CrawlerSubscriptionForAgDialogComponent;
        let fixture: ComponentFixture<CrawlerSubscriptionForAgDialogComponent>;
        let service: CrawlerSubscriptionForAgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [CrawlerSubscriptionForAgDialogComponent],
                providers: [
                    CrawlerUsernameSetForAgService,
                    CrawlerSubscriptionForAgService
                ]
            })
            .overrideTemplate(CrawlerSubscriptionForAgDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CrawlerSubscriptionForAgDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CrawlerSubscriptionForAgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CrawlerSubscriptionForAg(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.crawlerSubscription = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'crawlerSubscriptionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CrawlerSubscriptionForAg();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.crawlerSubscription = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'crawlerSubscriptionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
