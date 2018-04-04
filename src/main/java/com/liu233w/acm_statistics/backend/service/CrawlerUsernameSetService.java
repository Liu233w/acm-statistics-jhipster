package com.liu233w.acm_statistics.backend.service;

import com.liu233w.acm_statistics.backend.service.dto.CrawlerUsernameSetDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing CrawlerUsernameSet.
 */
public interface CrawlerUsernameSetService {

    /**
     * Save a crawlerUsernameSet.
     *
     * @param crawlerUsernameSetDTO the entity to save
     * @return the persisted entity
     */
    CrawlerUsernameSetDTO save(CrawlerUsernameSetDTO crawlerUsernameSetDTO);

    /**
     * Get all the crawlerUsernameSets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CrawlerUsernameSetDTO> findAll(Pageable pageable);
    /**
     * Get all the CrawlerUsernameSetDTO where SubscriptionId is null.
     *
     * @return the list of entities
     */
    List<CrawlerUsernameSetDTO> findAllWhereSubscriptionIdIsNull();

    /**
     * Get the "id" crawlerUsernameSet.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CrawlerUsernameSetDTO findOne(Long id);

    /**
     * Delete the "id" crawlerUsernameSet.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
