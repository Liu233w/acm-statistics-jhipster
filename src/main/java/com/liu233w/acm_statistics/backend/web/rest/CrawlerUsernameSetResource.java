package com.liu233w.acm_statistics.backend.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.liu233w.acm_statistics.backend.service.CrawlerUsernameSetService;
import com.liu233w.acm_statistics.backend.web.rest.errors.BadRequestAlertException;
import com.liu233w.acm_statistics.backend.web.rest.util.HeaderUtil;
import com.liu233w.acm_statistics.backend.web.rest.util.PaginationUtil;
import com.liu233w.acm_statistics.backend.service.dto.CrawlerUsernameSetDTO;
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
import java.util.stream.StreamSupport;

/**
 * REST controller for managing CrawlerUsernameSet.
 */
@RestController
@RequestMapping("/api")
public class CrawlerUsernameSetResource {

    private final Logger log = LoggerFactory.getLogger(CrawlerUsernameSetResource.class);

    private static final String ENTITY_NAME = "crawlerUsernameSet";

    private final CrawlerUsernameSetService crawlerUsernameSetService;

    public CrawlerUsernameSetResource(CrawlerUsernameSetService crawlerUsernameSetService) {
        this.crawlerUsernameSetService = crawlerUsernameSetService;
    }

    /**
     * POST  /crawler-username-sets : Create a new crawlerUsernameSet.
     *
     * @param crawlerUsernameSetDTO the crawlerUsernameSetDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new crawlerUsernameSetDTO, or with status 400 (Bad Request) if the crawlerUsernameSet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/crawler-username-sets")
    @Timed
    public ResponseEntity<CrawlerUsernameSetDTO> createCrawlerUsernameSet(@Valid @RequestBody CrawlerUsernameSetDTO crawlerUsernameSetDTO) throws URISyntaxException {
        log.debug("REST request to save CrawlerUsernameSet : {}", crawlerUsernameSetDTO);
        if (crawlerUsernameSetDTO.getId() != null) {
            throw new BadRequestAlertException("A new crawlerUsernameSet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CrawlerUsernameSetDTO result = crawlerUsernameSetService.save(crawlerUsernameSetDTO);
        return ResponseEntity.created(new URI("/api/crawler-username-sets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /crawler-username-sets : Updates an existing crawlerUsernameSet.
     *
     * @param crawlerUsernameSetDTO the crawlerUsernameSetDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated crawlerUsernameSetDTO,
     * or with status 400 (Bad Request) if the crawlerUsernameSetDTO is not valid,
     * or with status 500 (Internal Server Error) if the crawlerUsernameSetDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/crawler-username-sets")
    @Timed
    public ResponseEntity<CrawlerUsernameSetDTO> updateCrawlerUsernameSet(@Valid @RequestBody CrawlerUsernameSetDTO crawlerUsernameSetDTO) throws URISyntaxException {
        log.debug("REST request to update CrawlerUsernameSet : {}", crawlerUsernameSetDTO);
        if (crawlerUsernameSetDTO.getId() == null) {
            return createCrawlerUsernameSet(crawlerUsernameSetDTO);
        }
        CrawlerUsernameSetDTO result = crawlerUsernameSetService.save(crawlerUsernameSetDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, crawlerUsernameSetDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /crawler-username-sets : get all the crawlerUsernameSets.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of crawlerUsernameSets in body
     */
    @GetMapping("/crawler-username-sets")
    @Timed
    public ResponseEntity<List<CrawlerUsernameSetDTO>> getAllCrawlerUsernameSets(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("subscriptionid-is-null".equals(filter)) {
            log.debug("REST request to get all CrawlerUsernameSets where subscriptionId is null");
            return new ResponseEntity<>(crawlerUsernameSetService.findAllWhereSubscriptionIdIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of CrawlerUsernameSets");
        Page<CrawlerUsernameSetDTO> page = crawlerUsernameSetService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/crawler-username-sets");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /crawler-username-sets/:id : get the "id" crawlerUsernameSet.
     *
     * @param id the id of the crawlerUsernameSetDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the crawlerUsernameSetDTO, or with status 404 (Not Found)
     */
    @GetMapping("/crawler-username-sets/{id}")
    @Timed
    public ResponseEntity<CrawlerUsernameSetDTO> getCrawlerUsernameSet(@PathVariable Long id) {
        log.debug("REST request to get CrawlerUsernameSet : {}", id);
        CrawlerUsernameSetDTO crawlerUsernameSetDTO = crawlerUsernameSetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(crawlerUsernameSetDTO));
    }

    /**
     * DELETE  /crawler-username-sets/:id : delete the "id" crawlerUsernameSet.
     *
     * @param id the id of the crawlerUsernameSetDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/crawler-username-sets/{id}")
    @Timed
    public ResponseEntity<Void> deleteCrawlerUsernameSet(@PathVariable Long id) {
        log.debug("REST request to delete CrawlerUsernameSet : {}", id);
        crawlerUsernameSetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
