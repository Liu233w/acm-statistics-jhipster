/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { HistoryForAgDialogComponent } from '../../../../../../main/webapp/app/entities/history-for-ag/history-for-ag-dialog.component';
import { HistoryForAgService } from '../../../../../../main/webapp/app/entities/history-for-ag/history-for-ag.service';
import { HistoryForAg } from '../../../../../../main/webapp/app/entities/history-for-ag/history-for-ag.model';

describe('Component Tests', () => {

    describe('HistoryForAg Management Dialog Component', () => {
        let comp: HistoryForAgDialogComponent;
        let fixture: ComponentFixture<HistoryForAgDialogComponent>;
        let service: HistoryForAgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [HistoryForAgDialogComponent],
                providers: [
                    HistoryForAgService
                ]
            })
            .overrideTemplate(HistoryForAgDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistoryForAgDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryForAgService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HistoryForAg(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.history = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'historyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HistoryForAg();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.history = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'historyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
