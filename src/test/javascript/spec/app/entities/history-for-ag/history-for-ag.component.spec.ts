/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { HistoryForAgComponent } from '../../../../../../main/webapp/app/entities/history-for-ag/history-for-ag.component';
import { HistoryForAgService } from '../../../../../../main/webapp/app/entities/history-for-ag/history-for-ag.service';
import { HistoryForAg } from '../../../../../../main/webapp/app/entities/history-for-ag/history-for-ag.model';

describe('Component Tests', () => {

    describe('HistoryForAg Management Component', () => {
        let comp: HistoryForAgComponent;
        let fixture: ComponentFixture<HistoryForAgComponent>;
        let service: HistoryForAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [HistoryForAgComponent],
                providers: [
                    HistoryForAgService
                ]
            })
            .overrideTemplate(HistoryForAgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistoryForAgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryForAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new HistoryForAg(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.histories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
