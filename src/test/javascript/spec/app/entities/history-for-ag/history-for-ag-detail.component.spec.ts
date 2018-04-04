/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { HistoryForAgDetailComponent } from '../../../../../../main/webapp/app/entities/history-for-ag/history-for-ag-detail.component';
import { HistoryForAgService } from '../../../../../../main/webapp/app/entities/history-for-ag/history-for-ag.service';
import { HistoryForAg } from '../../../../../../main/webapp/app/entities/history-for-ag/history-for-ag.model';

describe('Component Tests', () => {

    describe('HistoryForAg Management Detail Component', () => {
        let comp: HistoryForAgDetailComponent;
        let fixture: ComponentFixture<HistoryForAgDetailComponent>;
        let service: HistoryForAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [HistoryForAgDetailComponent],
                providers: [
                    HistoryForAgService
                ]
            })
            .overrideTemplate(HistoryForAgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistoryForAgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryForAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new HistoryForAg(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.history).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
