/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { CrawlerSubscriptionForAgComponent } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag.component';
import { CrawlerSubscriptionForAgService } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag.service';
import { CrawlerSubscriptionForAg } from '../../../../../../main/webapp/app/entities/crawler-subscription-for-ag/crawler-subscription-for-ag.model';

describe('Component Tests', () => {

    describe('CrawlerSubscriptionForAg Management Component', () => {
        let comp: CrawlerSubscriptionForAgComponent;
        let fixture: ComponentFixture<CrawlerSubscriptionForAgComponent>;
        let service: CrawlerSubscriptionForAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [CrawlerSubscriptionForAgComponent],
                providers: [
                    CrawlerSubscriptionForAgService
                ]
            })
            .overrideTemplate(CrawlerSubscriptionForAgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CrawlerSubscriptionForAgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CrawlerSubscriptionForAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CrawlerSubscriptionForAg(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.crawlerSubscriptions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
