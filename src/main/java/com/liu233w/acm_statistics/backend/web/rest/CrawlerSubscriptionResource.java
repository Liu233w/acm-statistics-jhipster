package com.liu233w.acm_statistics.backend.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.liu233w.acm_statistics.backend.service.CrawlerSubscriptionService;
import com.liu233w.acm_statistics.backend.web.rest.errors.BadRequestAlertException;
import com.liu233w.acm_statistics.backend.web.rest.util.HeaderUtil;
import com.liu233w.acm_statistics.backend.web.rest.util.PaginationUtil;
import com.liu233w.acm_statistics.backend.service.dto.CrawlerSubscriptionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CrawlerSubscription.
 */
@RestController
@RequestMapping("/api")
public class CrawlerSubscriptionResource {

    private final Logger log = LoggerFactory.getLogger(CrawlerSubscriptionResource.class);

    private static final String ENTITY_NAME = "crawlerSubscription";

    private final CrawlerSubscriptionService crawlerSubscriptionService;

    public CrawlerSubscriptionResource(CrawlerSubscriptionService crawlerSubscriptionService) {
        this.crawlerSubscriptionService = crawlerSubscriptionService;
    }

    /**
     * POST  /crawler-subscriptions : Create a new crawlerSubscription.
     *
     * @param crawlerSubscriptionDTO the crawlerSubscriptionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new crawlerSubscriptionDTO, or with status 400 (Bad Request) if the crawlerSubscription has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/crawler-subscriptions")
    @Timed
    public ResponseEntity<CrawlerSubscriptionDTO> createCrawlerSubscription(@Valid @RequestBody CrawlerSubscriptionDTO crawlerSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to save CrawlerSubscription : {}", crawlerSubscriptionDTO);
        if (crawlerSubscriptionDTO.getId() != null) {
            throw new BadRequestAlertException("A new crawlerSubscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CrawlerSubscriptionDTO result = crawlerSubscriptionService.save(crawlerSubscriptionDTO);
        return ResponseEntity.created(new URI("/api/crawler-subscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /crawler-subscriptions : Updates an existing crawlerSubscription.
     *
     * @param crawlerSubscriptionDTO the crawlerSubscriptionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated crawlerSubscriptionDTO,
     * or with status 400 (Bad Request) if the crawlerSubscriptionDTO is not valid,
     * or with status 500 (Internal Server Error) if the crawlerSubscriptionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/crawler-subscriptions")
    @Timed
    public ResponseEntity<CrawlerSubscriptionDTO> updateCrawlerSubscription(@Valid @RequestBody CrawlerSubscriptionDTO crawlerSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to update CrawlerSubscription : {}", crawlerSubscriptionDTO);
        if (crawlerSubscriptionDTO.getId() == null) {
            return createCrawlerSubscription(crawlerSubscriptionDTO);
        }
        CrawlerSubscriptionDTO result = crawlerSubscriptionService.save(crawlerSubscriptionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, crawlerSubscriptionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /crawler-subscriptions : get all the crawlerSubscriptions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of crawlerSubscriptions in body
     */
    @GetMapping("/crawler-subscriptions")
    @Timed
    public ResponseEntity<List<CrawlerSubscriptionDTO>> getAllCrawlerSubscriptions(Pageable pageable) {
        log.debug("REST request to get a page of CrawlerSubscriptions");
        Page<CrawlerSubscriptionDTO> page = crawlerSubscriptionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/crawler-subscriptions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /crawler-subscriptions/:id : get the "id" crawlerSubscription.
     *
     * @param id the id of the crawlerSubscriptionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the crawlerSubscriptionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/crawler-subscriptions/{id}")
    @Timed
    public ResponseEntity<CrawlerSubscriptionDTO> getCrawlerSubscription(@PathVariable Long id) {
        log.debug("REST request to get CrawlerSubscription : {}", id);
        CrawlerSubscriptionDTO crawlerSubscriptionDTO = crawlerSubscriptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(crawlerSubscriptionDTO));
    }

    /**
     * DELETE  /crawler-subscriptions/:id : delete the "id" crawlerSubscription.
     *
     * @param id the id of the crawlerSubscriptionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/crawler-subscriptions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCrawlerSubscription(@PathVariable Long id) {
        log.debug("REST request to delete CrawlerSubscription : {}", id);
        crawlerSubscriptionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
