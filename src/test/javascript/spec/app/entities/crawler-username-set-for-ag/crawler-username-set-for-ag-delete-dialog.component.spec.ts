/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { CrawlerUsernameSetForAgDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag-delete-dialog.component';
import { CrawlerUsernameSetForAgService } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag.service';

describe('Component Tests', () => {

    describe('CrawlerUsernameSetForAg Management Delete Component', () => {
        let comp: CrawlerUsernameSetForAgDeleteDialogComponent;
        let fixture: ComponentFixture<CrawlerUsernameSetForAgDeleteDialogComponent>;
        let service: CrawlerUsernameSetForAgService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [CrawlerUsernameSetForAgDeleteDialogComponent],
                providers: [
                    CrawlerUsernameSetForAgService
                ]
            })
            .overrideTemplate(CrawlerUsernameSetForAgDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CrawlerUsernameSetForAgDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CrawlerUsernameSetForAgService);
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
