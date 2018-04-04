/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { CrawlerUsernameSetForAgDetailComponent } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag-detail.component';
import { CrawlerUsernameSetForAgService } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag.service';
import { CrawlerUsernameSetForAg } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag.model';

describe('Component Tests', () => {

    describe('CrawlerUsernameSetForAg Management Detail Component', () => {
        let comp: CrawlerUsernameSetForAgDetailComponent;
        let fixture: ComponentFixture<CrawlerUsernameSetForAgDetailComponent>;
        let service: CrawlerUsernameSetForAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [CrawlerUsernameSetForAgDetailComponent],
                providers: [
                    CrawlerUsernameSetForAgService
                ]
            })
            .overrideTemplate(CrawlerUsernameSetForAgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CrawlerUsernameSetForAgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CrawlerUsernameSetForAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CrawlerUsernameSetForAg(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.crawlerUsernameSet).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
