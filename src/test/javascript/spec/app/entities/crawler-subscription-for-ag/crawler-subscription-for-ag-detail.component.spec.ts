/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { CrawlerSubscriptionForAgDetailComponent } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag-detail.component';
import { CrawlerSubscriptionForAgService } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag.service';
import { CrawlerSubscriptionForAg } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag.model';

describe('Component Tests', () => {

    describe('CrawlerSubscriptionForAg Management Detail Component', () => {
        let comp: CrawlerSubscriptionForAgDetailComponent;
        let fixture: ComponentFixture<CrawlerSubscriptionForAgDetailComponent>;
        let service: CrawlerSubscriptionForAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [CrawlerSubscriptionForAgDetailComponent],
                providers: [
                    CrawlerSubscriptionForAgService
                ]
            })
            .overrideTemplate(CrawlerSubscriptionForAgDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CrawlerSubscriptionForAgDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CrawlerSubscriptionForAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CrawlerSubscriptionForAg(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.crawlerSubscription).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
