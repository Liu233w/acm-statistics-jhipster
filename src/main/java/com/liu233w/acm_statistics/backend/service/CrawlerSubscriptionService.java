package com.liu233w.acm_statistics.backend.service;

import com.liu233w.acm_statistics.backend.service.dto.CrawlerSubscriptionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing CrawlerSubscription.
 */
public interface CrawlerSubscriptionService {

    /**
     * Save a crawlerSubscription.
     *
     * @param crawlerSubscriptionDTO the entity to save
     * @return the persisted entity
     */
    CrawlerSubscriptionDTO save(CrawlerSubscriptionDTO crawlerSubscriptionDTO);

    /**
     * Get all the crawlerSubscriptions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CrawlerSubscriptionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" crawlerSubscription.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CrawlerSubscriptionDTO findOne(Long id);

    /**
     * Delete the "id" crawlerSubscription.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
