/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AcmStatisticsJhipsterTestModule } from '../../../test.module';
import { CrawlerUsernameSetForAgComponent } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag.component';
import { CrawlerUsernameSetForAgService } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag.service';
import { CrawlerUsernameSetForAg } from '../../../../../../main/webapp/app/entities/crawler-username-set-for-ag/crawler-username-set-for-ag.model';

describe('Component Tests', () => {

    describe('CrawlerUsernameSetForAg Management Component', () => {
        let comp: CrawlerUsernameSetForAgComponent;
        let fixture: ComponentFixture<CrawlerUsernameSetForAgComponent>;
        let service: CrawlerUsernameSetForAgService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AcmStatisticsJhipsterTestModule],
                declarations: [CrawlerUsernameSetForAgComponent],
                providers: [
                    CrawlerUsernameSetForAgService
                ]
            })
            .overrideTemplate(CrawlerUsernameSetForAgComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CrawlerUsernameSetForAgComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CrawlerUsernameSetForAgService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CrawlerUsernameSetForAg(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.crawlerUsernameSets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
