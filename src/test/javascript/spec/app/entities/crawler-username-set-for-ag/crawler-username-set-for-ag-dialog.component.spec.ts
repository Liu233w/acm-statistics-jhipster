/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { CrawlerUsernameSetForAgDialogComponent } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag-dialog.component';
import { CrawlerUsernameSetForAgService } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag.service';
import { CrawlerUsernameSetForAg } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag.model';
import { CrawlerSubscriptionForAgService } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag';

describe('Component Tests', () => {

    describe('CrawlerUsernameSetForAg Management Dialog Component', () => {
        let comp: CrawlerUsernameSetForAgDialogComponent;
        let fixture: ComponentFixture<CrawlerUsernameSetForAgDialogComponent>;
        let service: CrawlerUsernameSetForAgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [CrawlerUsernameSetForAgDialogComponent],
                providers: [
                    CrawlerSubscriptionForAgService,
                    CrawlerUsernameSetForAgService
                ]
            })
            .overrideTemplate(CrawlerUsernameSetForAgDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CrawlerUsernameSetForAgDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CrawlerUsernameSetForAgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CrawlerUsernameSetForAg(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.crawlerUsernameSet = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'crawlerUsernameSetListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CrawlerUsernameSetForAg();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.crawlerUsernameSet = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'crawlerUsernameSetListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
